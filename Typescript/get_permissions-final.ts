import {
    createBearerAuthenticationConfig, SearchMetadataRequest,
    ThoughtSpotRestApi,
} from '@thoughtspot/rest-api-sdk';

// Step 1 - set the constants.
const tsURL = "";
const tokenServer = "";
const username = "userNNN";
const passcode = "";

/**
 * Gets the auth token for the user, using the trusted auth server.
 */
export const getAuthToken = async (): Promise<string> => {
    // Step 2 - get the auth token.
    const endpoint = `${tokenServer}/token?username=${username}&passcode=${passcode}`;
    console.log("token endpoint: " + endpoint);

    const response = await fetch(endpoint);

    const token = await response.json();
    console.log("token:  " + token);

    return token as string;
};

/**
 * Returns the API client to use for the SDK using the Vercel token service.
 */
const getAPIClient = () => {
    // Step 3 - Create the API client.
    const config = createBearerAuthenticationConfig(tsURL, getAuthToken);
    return new ThoughtSpotRestApi(config);
}

/**
 * Gets the GUID for the liveboard with the given name, using the POST /api/rest/2.0/metadata/search endpoint.
 * @param ts The API client.
 * @param name The name of the liveboard.
 */
const getLiveboardGUID = async (ts: ThoughtSpotRestApi, name: string): Promise<string> => {
    // Step 4 - Get the GUID for the liveboard.
    console.log(`getting GUID for ${name}`);
    const body = {
        "metadata": [
            {
                "identifier": "Sales Performance",
                "type": "LIVEBOARD"
            }
        ]
    }

    const resp = await ts.searchMetadata(body as SearchMetadataRequest);

    // Return the first GUID.
    if (resp) {
        return resp[0].metadata_id;
    }

    return "";
}

/**
 * Get the permissions using the POST /api/rest/2.0/security/principals/fetch-permissions endpoint.
 * @param ts The API client.
 * @param guid The GUID for the metadata to get permissions for.
 */
const getPermissions = async (ts: ThoughtSpotRestApi, guid: string) => {
    // Step 5 - Get the permissions for the metadata ID.
    console.log(`getting permissions for ${guid}`);
    const resp = await ts.fetchPermissionsOnMetadata({
        "metadata": [
            {
                "identifier": "0dc92611-2643-4c3e-a7c3-e7e421af9fd1",
                "type": "LIVEBOARD"
            }
        ],
        "include_dependent_objects": false,
        "record_offset": 0,
        "record_size": -1
    });

    return extractPermissions(resp);
}

/**
 * Defines the payload returned for the permissions.  This is used to extract the results of the metadata permissions.
 */
interface MetadataPermissionInfo {
    metadata_id: string;
    metadata_name: string;
    users: { username: string; permissions: string }[];
    groups: { groupname: string; permissions: string }[];
}

/**
 * Extracts the permissions from the POST /api/rest/2.0/security/principals/fetch-permissions results.
 */
const extractPermissions = (data: any): MetadataPermissionInfo[] => {
    // Step 6 - Get the details from the metadata.
    return data.metadata_permission_details.map((detail: any) => {
        const users: { username: string; permissions: string }[] = [];
        const groups: { groupname: string; permissions: string }[] = [];

        detail.principal_permission_info.forEach((info: any) => {
            const principalType = info.principal_type;

            info.principal_permissions.forEach((permission) => {
                if (principalType === "USER") {
                    users.push({
                        username: permission.principal_name,
                        permissions: permission.permission,
                    });
                } else if (principalType === "USER_GROUP") {
                    groups.push({
                        groupname: permission.principal_name,
                        permissions: permission.permission,
                    });
                }
            });
        });

        return {
            metadata_id: detail.metadata_id,
            metadata_name: detail.metadata_name,
            users,
            groups,
        };
    });
};

/**
 * Shows the access rights for users and groups.
 * @param permissions The permissions on the metadata.
 */
const showAccess = (permissions: MetadataPermissionInfo[]) => {
    // Step 7 - Print the results.
    for (const permission of permissions) {
        console.log(`Permissions for ${permission.metadata_name}: `);

        for (const u of permission.users) {
            console.log(`user ${u.username}: ${u.permissions}`);
        }
        for (const g of permission.groups) {
            console.log(`group ${g.groupname}: ${g.permissions}`);
        }
    }
}

const ts = getAPIClient();
const guid = await getLiveboardGUID(ts, 'Sales Performance');
const permissions = await getPermissions(ts, guid);
showAccess(permissions);

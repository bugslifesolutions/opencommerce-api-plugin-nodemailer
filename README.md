# O365 Exchange
https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth


# opencommerce-api-plugin-nodemailer

## o365 Dependencies

### Nodejs
@azure/msal-node
-> requires nodejs >= 18

### Microsoft App Registration

#### Manifest
{
	"id": "0425d55d-37b6-4aed-8ce8-6612e58fe698",
	"acceptMappedClaims": null,
	"accessTokenAcceptedVersion": null,
	"addIns": [],
	"allowPublicClient": false,
	"appId": "a6e5896b-4222-4a4f-b38c-4d6a8ef8c98f",
	"appRoles": [
		{
			"allowedMemberTypes": [
				"User"
			],
			"description": "User",
			"displayName": "User",
			"id": "18d14569-c3bd-439b-9a66-3a2aee01d14f",
			"isEnabled": true,
			"lang": null,
			"origin": "Application",
			"value": null
		},
		{
			"allowedMemberTypes": [
				"User"
			],
			"description": "msiam_access",
			"displayName": "msiam_access",
			"id": "b9632174-c057-4f7e-951b-be3adc52bfe6",
			"isEnabled": true,
			"lang": null,
			"origin": "Application",
			"value": null
		}
	],
	"oauth2AllowUrlPathMatching": false,
	"createdDateTime": "2023-10-04T01:44:27Z",
	"description": null,
	"certification": null,
	"disabledByMicrosoftStatus": null,
	"groupMembershipClaims": null,
	"identifierUris": [
		"api://a6e5896b-4222-4a4f-b38c-4d6a8ef8c98f"
	],
	"informationalUrls": {
		"termsOfService": null,
		"support": null,
		"privacy": null,
		"marketing": null
	},
	"keyCredentials": [],
	"knownClientApplications": [],
	"logoUrl": null,
	"logoutUrl": null,
	"name": "KubeCommercePlus",
	"notes": null,
	"oauth2AllowIdTokenImplicitFlow": true,
	"oauth2AllowImplicitFlow": true,
	"oauth2Permissions": [],
	"oauth2RequirePostResponse": false,
	"optionalClaims": null,
	"orgRestrictions": [],
	"parentalControlSettings": {
		"countriesBlockedForMinors": [],
		"legalAgeGroupRule": "Allow"
	},
	"passwordCredentials": [
		{
			"customKeyIdentifier": null,
			"endDate": "2024-10-04T12:11:36.707Z",
			"keyId": "b1edd9ca-5337-4c73-8da3-10cfc2815e14",
			"startDate": "2023-10-05T12:11:36.707Z",
			"value": null,
			"createdOn": "2023-10-05T12:12:56.8324948Z",
			"hint": "AVv",
			"displayName": "clientSecret"
		}
	],
	"preAuthorizedApplications": [],
	"publisherDomain": "NETORG189455.onmicrosoft.com",
	"replyUrlsWithType": [],
	"requiredResourceAccess": [
		{
			"resourceAppId": "00000003-0000-0000-c000-000000000000",
			"resourceAccess": [
				{
					"id": "b633e1c5-b582-4048-a93e-9f11b44c7e96",
					"type": "Role"
				}
			]
		},
		{
			"resourceAppId": "00000002-0000-0ff1-ce00-000000000000",
			"resourceAccess": [
				{
					"id": "7146a1f0-8703-45b3-9eae-527a64c00995",
					"type": "Role"
				}
			]
		}
	],
	"samlMetadataUrl": null,
	"signInUrl": "https://account.activedirectory.windowsazure.com:444/applications/default.aspx?metadata=customappsso|ISV9.1|primary|z",
	"signInAudience": "AzureADMyOrg",
	"tags": [],
	"tokenEncryptionKeyId": null
}
==================================

PS C:\Users\Lenovo> New-ServicePrincipal -AppId a6e5896b-4222-4a4f-b38c-4d6a8ef8c98f -ObjectId df2d972c-419f-4cfe-977b-ae85308e53af

DisplayName                              ObjectId                                AppId
-----------                              --------                                -----
                                         df2d972c-419f-4cfe-977b-ae85308e53af    a6e5896b-4222-4a4f-b38c-4d6a8ef8c98f


PS C:\Users\Lenovo> Get-ServicePrincipal | fl


DisplayName            :
AppId                  : a6e5896b-4222-4a4f-b38c-4d6a8ef8c98f
ObjectId               : df2d972c-419f-4cfe-977b-ae85308e53af
Sid                    : S-1-5-21-405896037-984911836-1118018715-47610198
SidHistory             : {}
Identity               : df2d972c-419f-4cfe-977b-ae85308e53af
Id                     : df2d972c-419f-4cfe-977b-ae85308e53af
IsValid                : True
ExchangeVersion        : 1.1 (15.0.0.0)
Name                   : df2d972c-419f-4cfe-977b-ae85308e53af
DistinguishedName      : CN=df2d972c-419f-4cfe-977b-ae85308e53af,OU=NETORG189455.onmicrosoft.com,OU=Microsoft Exchange
                         Hosted Organizations,DC=NAMPR03A006,DC=PROD,DC=OUTLOOK,DC=COM
ObjectCategory         : NAMPR03A006.PROD.OUTLOOK.COM/Configuration/Schema/Person
ObjectClass            : {top, person, organizationalPerson, user}
WhenChanged            : 2023-10-21 10:09:56 AM
WhenCreated            : 2023-10-21 10:09:56 AM
WhenChangedUTC         : 2023-10-21 2:09:56 PM
WhenCreatedUTC         : 2023-10-21 2:09:56 PM
ExchangeObjectId       : 7bf05cab-c602-4c6d-a566-b58ac6578027
OrganizationalUnitRoot : NETORG189455.onmicrosoft.com
OrganizationId         : NAMPR03A006.PROD.OUTLOOK.COM/Microsoft Exchange Hosted
                         Organizations/NETORG189455.onmicrosoft.com -
                         NAMPR03A006.PROD.OUTLOOK.COM/ConfigurationUnits/NETORG189455.onmicrosoft.com/Configuration
Guid                   : 7bf05cab-c602-4c6d-a566-b58ac6578027
OriginatingServer      : BYAPR03A06DC005.NAMPR03A006.PROD.OUTLOOK.COM
ObjectState            : Changed

WARNING: The ServiceId parameter is being depreciated and will be replaced with ObjectId. Please note that already
existing Exchange Service Principal Service Ids are now known as Object Ids.


PS C:\Users\Lenovo>

PS C:\Users\Lenovo> Add-MailboxPermission -Identity "weborders-noreply@applianceshack.com" -User  df2d972c-419f-4cfe-977b-ae85308e53af

cmdlet Add-MailboxPermission at command pipeline position 1
Supply values for the following parameters:
AccessRights[0]: FullAccess
AccessRights[1]:

Identity             User                 AccessRights                                                IsInherited Deny
--------             ----                 ------------                                                ----------- ----
730aef82-c288-468... S-1-5-21-40589603... {FullAccess}                                                False       False


PS C:\Users\Lenovo>

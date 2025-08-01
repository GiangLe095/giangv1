/**
 * Raw permissions data copied directly from the database.
 *
 * @remarks
 * This array contains the full set of permission objects as retrieved from the database,
 * including all metadata fields. It is intended to be used as a static reference and
 * must always be declared with `as const` to preserve literal types and prevent mutation.
 * This is important for TypeScript to infer the correct types for the permissions.
 * ```ts
 * const PERMISSIONS_RAW = [ ... ] as const;
 * ```
 */
export const PERMISSIONS_RAW = [
    {
      _id: {
        $oid: "682959a559f38fdeea75f811",
      },
      deletedAt: null,
      name: "users:create",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.248Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.248Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f818",
      },
      deletedAt: null,
      name: "users:update",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.297Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.297Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f81b",
      },
      deletedAt: null,
      name: "users:delete",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.301Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.301Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f81e",
      },
      deletedAt: null,
      name: "users:read",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.304Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.304Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f821",
      },
      deletedAt: null,
      name: "white-lists:create",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.306Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.306Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f824",
      },
      deletedAt: null,
      name: "white-lists:update",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.308Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.308Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f827",
      },
      deletedAt: null,
      name: "white-lists:delete",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.312Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.312Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f82a",
      },
      deletedAt: null,
      name: "white-lists:read",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.316Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.316Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f82d",
      },
      deletedAt: null,
      name: "roles:create",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.320Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.320Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f830",
      },
      deletedAt: null,
      name: "roles:update",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.326Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.326Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f833",
      },
      deletedAt: null,
      name: "roles:delete",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.330Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.330Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f836",
      },
      deletedAt: null,
      name: "roles:read",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.334Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.334Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f839",
      },
      deletedAt: null,
      name: "permissions:create",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.337Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.337Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f83c",
      },
      deletedAt: null,
      name: "permissions:update",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.340Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.340Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f83f",
      },
      deletedAt: null,
      name: "permissions:delete",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.344Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.344Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682959a559f38fdeea75f842",
      },
      deletedAt: null,
      name: "permissions:read",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-18T03:53:09.348Z",
      },
      updatedAt: {
        $date: "2025-05-18T03:53:09.348Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682b4d45474245597515e179",
      },
      deletedAt: null,
      type: "User",
      name: "admins:create",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-19T15:24:53.213Z",
      },
      updatedAt: {
        $date: "2025-05-19T15:24:53.213Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682b4d45474245597515e17e",
      },
      deletedAt: null,
      type: "User",
      name: "admins:update",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-19T15:24:53.232Z",
      },
      updatedAt: {
        $date: "2025-05-19T15:24:53.232Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682b4d45474245597515e181",
      },
      deletedAt: null,
      type: "User",
      name: "admins:delete",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-19T15:24:53.237Z",
      },
      updatedAt: {
        $date: "2025-05-19T15:24:53.237Z",
      },
      __v: 0,
    },
    {
      _id: {
        $oid: "682b4d45474245597515e185",
      },
      deletedAt: null,
      type: "User",
      name: "admins:read",
      deleted: false,
      description: "false",
      createdAt: {
        $date: "2025-05-19T15:24:53.242Z",
      },
      updatedAt: {
        $date: "2025-05-19T15:24:53.242Z",
      },
      __v: 0,
    },
  ] as const;
  
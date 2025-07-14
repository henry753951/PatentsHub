import { DeleteBackupAction } from "./actions/deleteBackup";
import { GetBackupsAction } from "./actions/getBackups";
import { GetCurrentDBInfoAction } from "./actions/getCurrentDBInfo";
import { PingAction } from "./actions/ping";
import { CreateBackupAction } from "./actions/createBackup";
import { DatabaseCommand } from "./commands/database";
import { MessageCommand } from "./commands/message";
import { PingCommand } from "./commands/ping";
import { UseBackupUrlAction } from "./actions/useBackupUrl";
import { RestartClientAction } from "./actions/restartClient";
import { GetClientInfoAction } from "./actions/getClientInfo";

export const events = {
   commandEvents: [PingCommand, DatabaseCommand, MessageCommand],
   actionEvents: {
      ping: PingAction,
      getCurrentDBInfo: GetCurrentDBInfoAction,
      getBackups: GetBackupsAction,
      deleteBackup: DeleteBackupAction,
      createBackup: CreateBackupAction,
      useBackupUrl: UseBackupUrlAction,
      restartClient: RestartClientAction,
      getClientInfo: GetClientInfoAction,
   },
} as const;

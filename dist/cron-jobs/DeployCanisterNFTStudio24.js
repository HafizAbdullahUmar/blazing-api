"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployCanisterNFTStudio24 = void 0;
const child_process_1 = require("child_process");
const node_cron_1 = __importDefault(require("node-cron"));
let isRunning = false;
const DeployCanisterNFTStudio24 = () => __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule('0 0 * * *', () => {
        if (isRunning) {
            console.log('r:::::::::;Already running');
            return;
        }
        console.log('running a task every 10 seconds');
        isRunning = true;
        (0, child_process_1.exec)('dfx deploy entry', (error, stdout, stderr) => {
            console.log('Deploying canisters');
            if (error) {
                console.log(`error: ${error.message}`);
            }
            console.log(`stderr: ${stderr}`);
            console.log(`stdout: ${stdout}`);
            isRunning = false;
            return;
        });
    });
});
exports.DeployCanisterNFTStudio24 = DeployCanisterNFTStudio24;
//# sourceMappingURL=DeployCanisterNFTStudio24.js.map
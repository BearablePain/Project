import { BuildOptions } from "./types/config";
import { Configuration as DevServerConfiguration} from "webpack-dev-server";

export function  buildDev(options: BuildOptions): DevServerConfiguration {
    return {
port: options.port,
        open: true,
    }
}

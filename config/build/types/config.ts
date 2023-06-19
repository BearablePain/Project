import { PROJECT } from '../../../src/shared/const/global';

export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;

}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  apiUrl: string;
  project: PROJECT;
}

export interface BuildEnv {
  mode: BuildMode,
  port: number,
  apiUrl: string,
}

export interface Camera {
  active: boolean;
  capabilities: any;
  configuration: any;
  connectionUri: string;
  defaultViewStreamId: number;
  driver: string;
  features: any;
  href: string;
  id: number;
  name: string;
  primaryStream: any;
  retention: number;
  server: any;
  streams: any;
}

export interface CameraResponse {
  cameras: Camera[];
}

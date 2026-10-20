import type { Response } from "express";

export const httpResponse = {
  ok: (res: Response, data: any) => {
    return res.status(200).json(data);
  },

  created: (res: Response, data: any) => {
    return res.status(201).json(data);
  },

  noContent: (res: Response) => {
    return res.status(204).send();
  },

  notFound: (res: Response, data: any) => {
    return res.status(404).json(data);
  },

  conflict: (res: Response, data: any) => {
    return res.status(409).json(data);
  },

  badRequest: (res: Response, data: any) => {
    return res.status(400).json(data);
  },

  unauthorized: (res: Response, data: any) => {
    return res.status(401).json(data);
  },

  forbidden: (res: Response, data: any) => {
    return res.status(403).json(data);
  },

  internalServer500: (res: Response, data: any) => {
    return res.status(500).json(data);
  },
};

import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Inisialisasi middleware CORS
export const cors = Cors({
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  credentials: true,
  origin: "*", // Untuk pengembangan, di produksi gunakan domain spesifik
});

// Helper function untuk menjalankan middleware
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
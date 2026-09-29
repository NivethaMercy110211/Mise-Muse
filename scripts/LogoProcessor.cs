using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

public class LogoProcessor
{
    public static void Process(string inputPath, string outputPath, string outputDarkPath)
    {
        if (!File.Exists(inputPath))
        {
            throw new FileNotFoundException("File not found: " + inputPath);
        }

        using (Bitmap src = new Bitmap(inputPath))
        {
            int width = src.Width;
            int height = src.Height;

            using (Bitmap dest = new Bitmap(width, height, PixelFormat.Format32bppArgb))
            using (Bitmap destDark = new Bitmap(width, height, PixelFormat.Format32bppArgb))
            {
                Rectangle rect = new Rectangle(0, 0, width, height);
                BitmapData srcData = src.LockBits(rect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                BitmapData destData = dest.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                BitmapData destDarkData = destDark.LockBits(rect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

                int bytes = Math.Abs(srcData.Stride) * height;
                byte[] rgb = new byte[bytes];
                byte[] destRgb = new byte[bytes];
                byte[] destDarkRgb = new byte[bytes];

                System.Runtime.InteropServices.Marshal.Copy(srcData.Scan0, rgb, 0, bytes);

                for (int i = 0; i < bytes; i += 4)
                {
                    int b = rgb[i];
                    int g = rgb[i + 1];
                    int r = rgb[i + 2];

                    int minChannel = Math.Min(r, Math.Min(g, b));
                    int maxDiff = Math.Max(Math.Abs(r - g), Math.Max(Math.Abs(r - b), Math.Abs(g - b)));

                    // Pure white or very near-white background
                    if (minChannel >= 246 && maxDiff <= 10)
                    {
                        destRgb[i] = 0;
                        destRgb[i + 1] = 0;
                        destRgb[i + 2] = 0;
                        destRgb[i + 3] = 0;

                        destDarkRgb[i] = 0;
                        destDarkRgb[i + 1] = 0;
                        destDarkRgb[i + 2] = 0;
                        destDarkRgb[i + 3] = 0;
                    }
                    else if (minChannel >= 200 && maxDiff <= 25)
                    {
                        // Anti-aliased edge smoothing
                        double factor = (minChannel - 200.0) / (246.0 - 200.0);
                        int alpha = (int)Math.Round((1.0 - factor) * 255.0);
                        alpha = Math.Max(0, Math.Min(255, alpha));

                        double aNorm = alpha / 255.0;
                        int unblendR = aNorm > 0.05 ? Math.Min(255, Math.Max(0, (int)((r - 255.0 * (1.0 - aNorm)) / aNorm))) : r;
                        int unblendG = aNorm > 0.05 ? Math.Min(255, Math.Max(0, (int)((g - 255.0 * (1.0 - aNorm)) / aNorm))) : g;
                        int unblendB = aNorm > 0.05 ? Math.Min(255, Math.Max(0, (int)((b - 255.0 * (1.0 - aNorm)) / aNorm))) : b;

                        destRgb[i] = (byte)unblendB;
                        destRgb[i + 1] = (byte)unblendG;
                        destRgb[i + 2] = (byte)unblendR;
                        destRgb[i + 3] = (byte)alpha;

                        // Dark mode version: warm subtle bronze luminance boost
                        int darkR = Math.Min(255, (int)(unblendR * 1.15 + 18));
                        int darkG = Math.Min(255, (int)(unblendG * 1.12 + 12));
                        int darkB = Math.Min(255, (int)(unblendB * 1.08 + 8));

                        destDarkRgb[i] = (byte)darkB;
                        destDarkRgb[i + 1] = (byte)darkG;
                        destDarkRgb[i + 2] = (byte)darkR;
                        destDarkRgb[i + 3] = (byte)alpha;
                    }
                    else
                    {
                        // Fully opaque logo interior
                        destRgb[i] = (byte)b;
                        destRgb[i + 1] = (byte)g;
                        destRgb[i + 2] = (byte)r;
                        destRgb[i + 3] = 255;

                        // For dark mode: slightly lift dark bronze shadows so they don't vanish on black
                        int darkR = Math.Min(255, (int)(r * 1.14 + 16));
                        int darkG = Math.Min(255, (int)(g * 1.12 + 12));
                        int darkB = Math.Min(255, (int)(b * 1.08 + 8));

                        destDarkRgb[i] = (byte)darkB;
                        destDarkRgb[i + 1] = (byte)darkG;
                        destDarkRgb[i + 2] = (byte)darkR;
                        destDarkRgb[i + 3] = 255;
                    }
                }

                System.Runtime.InteropServices.Marshal.Copy(destRgb, 0, destData.Scan0, bytes);
                System.Runtime.InteropServices.Marshal.Copy(destDarkRgb, 0, destDarkData.Scan0, bytes);

                src.UnlockBits(srcData);
                dest.UnlockBits(destData);
                destDark.UnlockBits(destDarkData);

                // Save to temporary files first to avoid file lock
                string tempDest = outputPath + ".tmp";
                string tempDestDark = outputDarkPath + ".tmp";

                dest.Save(tempDest, ImageFormat.Png);
                destDark.Save(tempDestDark, ImageFormat.Png);

                File.Copy(tempDest, outputPath, true);
                File.Copy(tempDestDark, outputDarkPath, true);

                File.Delete(tempDest);
                File.Delete(tempDestDark);
            }
        }
    }
}

Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "..\assets\logo.png"
$sourcePath = [System.IO.Path]::GetFullPath($sourcePath)
Write-Output "Processing: $sourcePath"

$src = [System.Drawing.Bitmap]::FromFile($sourcePath)
$width = $src.Width
$height = $src.Height
Write-Output "Dimensions: $width x $height"

# Create a 32-bit ARGB bitmap
$dest = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$destDark = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Lock bits for fast processing
$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$srcData = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$destData = $dest.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$destDarkData = $destDark.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$bytes = [Math]::Abs($srcData.Stride) * $height
$rgbValues = New-Object byte[] $bytes
$destValues = New-Object byte[] $bytes
$destDarkValues = New-Object byte[] $bytes

[System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $rgbValues, 0, $bytes)

# Process pixels: 4 bytes per pixel (B, G, R, A)
for ($i = 0; $i -lt $bytes; $i += 4) {
    $b = [int]$rgbValues[$i]
    $g = [int]$rgbValues[$i + 1]
    $r = [int]$rgbValues[$i + 2]
    
    # Calculate whiteness / distance to pure white
    $minChannel = [Math]::Min($r, [Math]::Min($g, $b))
    $maxDiff = [Math]::Max([Math]::Abs($r - $g), [Math]::Max([Math]::Abs($r - $b), [Math]::Abs($g - $b)))
    
    # Pure white or very near white with low saturation
    if ($minChannel -gt 248 -and $maxDiff -le 8) {
        # Fully transparent
        $destValues[$i] = 0
        $destValues[$i + 1] = 0
        $destValues[$i + 2] = 0
        $destValues[$i + 3] = 0
        
        $destDarkValues[$i] = 0
        $destDarkValues[$i + 1] = 0
        $destDarkValues[$i + 2] = 0
        $destDarkValues[$i + 3] = 0
    }
    elseif ($minChannel -gt 215 -and $maxDiff -le 18) {
        # Anti-aliased white edge - blend alpha smoothly
        $factor = ($minChannel - 215) / (248 - 215)
        $alpha = [int]([Math]::Round((1.0 - $factor) * 255))
        if ($alpha -lt 0) { $alpha = 0 }
        if ($alpha -gt 255) { $alpha = 255 }
        
        # Color de-fringing (remove white bias)
        # unblend: C_true = (C_obs - (1-alpha)*255) / alpha
        $aNorm = $alpha / 255.0
        if ($aNorm -gt 0.05) {
            $unblendR = [int][Math]::Min(255, [Math]::Max(0, ($r - 255.0 * (1.0 - $aNorm)) / $aNorm))
            $unblendG = [int][Math]::Min(255, [Math]::Max(0, ($g - 255.0 * (1.0 - $aNorm)) / $aNorm))
            $unblendB = [int][Math]::Min(255, [Math]::Max(0, ($b - 255.0 * (1.0 - $aNorm)) / $aNorm))
        } else {
            $unblendR = $r; $unblendG = $g; $unblendB = $b
        }
        
        $destValues[$i] = [byte]$unblendB
        $destValues[$i + 1] = [byte]$unblendG
        $destValues[$i + 2] = [byte]$unblendR
        $destValues[$i + 3] = [byte]$alpha
        
        $destDarkValues[$i] = [byte]$unblendB
        $destDarkValues[$i + 1] = [byte]$unblendG
        $destDarkValues[$i + 2] = [byte]$unblendR
        $destDarkValues[$i + 3] = [byte]$alpha
    }
    else {
        # Keep original pixel
        $destValues[$i] = [byte]$b
        $destValues[$i + 1] = [byte]$g
        $destValues[$i + 2] = [byte]$r
        $destValues[$i + 3] = 255
        
        # In dark mode, slightly boost the bronze luminosity so it radiates against dark background
        $boostR = [int][Math]::Min(255, [Math]::Round($r * 1.12 + 15))
        $boostG = [int][Math]::Min(255, [Math]::Round($g * 1.10 + 10))
        $boostB = [int][Math]::Min(255, [Math]::Round($b * 1.08 + 5))
        $destDarkValues[$i] = [byte]$boostB
        $destDarkValues[$i + 1] = [byte]$boostG
        $destDarkValues[$i + 2] = [byte]$boostR
        $destDarkValues[$i + 3] = 255
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($destValues, 0, $destData.Scan0, $bytes)
[System.Runtime.InteropServices.Marshal]::Copy($destDarkValues, 0, $destDarkData.Scan0, $bytes)

$src.UnlockBits($srcData)
$dest.UnlockBits($destData)
$destDark.UnlockBits($destDarkData)

# Backup original logo
$backupPath = Join-Path $PSScriptRoot "..\assets\logo-original.png"
if (-not (Test-Path $backupPath)) {
    Copy-Item $sourcePath $backupPath
}

# Save new transparent logo
$dest.Save($sourcePath, [System.Drawing.Imaging.ImageFormat]::Png)

# Save dark theme optimized logo
$darkPath = Join-Path $PSScriptRoot "..\assets\logo-dark.png"
$darkPath = [System.IO.Path]::GetFullPath($darkPath)
$destDark.Save($darkPath, [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$dest.Dispose()
$destDark.Dispose()

Write-Output "Successfully saved transparent logo to $sourcePath and dark logo to $darkPath"

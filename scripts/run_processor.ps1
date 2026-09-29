$csPath = Join-Path $PSScriptRoot "LogoProcessor.cs"
$inputPath = Join-Path $PSScriptRoot "..\assets\logo.png"
$outputPath = Join-Path $PSScriptRoot "..\assets\logo.png"
$outputDarkPath = Join-Path $PSScriptRoot "..\assets\logo-dark.png"

$inputPath = [System.IO.Path]::GetFullPath($inputPath)
$outputPath = [System.IO.Path]::GetFullPath($outputPath)
$outputDarkPath = [System.IO.Path]::GetFullPath($outputDarkPath)

# Create backup if not exists
$backupPath = Join-Path $PSScriptRoot "..\assets\logo-backup.png"
if (-not (Test-Path $backupPath)) {
    Copy-Item $inputPath $backupPath -Force
}

Add-Type -Path $csPath -ReferencedAssemblies System.Drawing
[LogoProcessor]::Process($backupPath, $outputPath, $outputDarkPath)
Write-Output "Successfully processed logo: transparent background saved to $outputPath and dark theme logo saved to $outputDarkPath"

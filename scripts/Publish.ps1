# --- VARIABLES ---
$scriptRoot = $PSScriptRoot
$rootPath = (Join-Path $scriptRoot "..") | Resolve-Path
$outputPath = Join-Path $rootPath "output"
$apiPath = Join-Path $rootPath "api"
$webPath = Join-Path $rootPath "web"
$wwwrootDest = Join-Path $outputPath "wwwroot"

# --- 0. READ VERSION ---
# Path to the version file inside the web project
$versionFilePath = Join-Path $webPath "src\app\data\version.json"

if (Test-Path $versionFilePath) {
    $versionData = Get-Content $versionFilePath | ConvertFrom-Json
    $version = $versionData.version
    Write-Host "Detected Version: v$version" -ForegroundColor Cyan
} else {
    Write-Host "version.json not found, defaulting to v0." -ForegroundColor Yellow
    $version = 0
}

# Define Zip Name using the version variable
$zipPath = Join-Path $rootPath "output-v$version.zip"

# --- 1. CLEAN PREVIOUS OUTPUT ---
Write-Host "Cleaning old output folder..." -ForegroundColor Yellow
if (Test-Path $outputPath) {
  Remove-Item $outputPath -Recurse -Force
}
# Clean old zip files matching this version (or just the specific one)
if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

# --- 2. BUILD API ---
Push-Location $apiPath
task publish
New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
Copy-Item ".\publish\*" $outputPath -Recurse
Pop-Location

# --- 3. BUILD WEB ---
Push-Location $webPath
task publish
New-Item -ItemType Directory -Path $wwwrootDest -Force | Out-Null
Copy-Item ".\dist\*" $wwwrootDest -Recurse
Pop-Location

# --- 4. CREATE ZIP ---
Write-Host "Zipping output folder..." -ForegroundColor Cyan
Compress-Archive -Path $outputPath -DestinationPath $zipPath -Force

# --- 5. SUCCESS SOUND ---
Write-Host "Build Complete! Zipped to $zipPath" -ForegroundColor Green

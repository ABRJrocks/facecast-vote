# This script works for React.js projects
# Put this in the root folder of your project
# Then run: .\get_code_context.ps1

# Use the current directory as the project directory
$project_dir = Get-Location

# Use a fixed name for the output file in the current directory
$output_file = Join-Path $project_dir "code_context.txt"

# Check if the output file exists and remove it if it does
if (Test-Path $output_file) {
    Remove-Item $output_file
}

# List of directories to look for
$directories = @("src", "public", "components", "pages", "styles", "utils", "hooks", "constants", "services", "types")

# List of file types to ignore
$ignore_files = @("*.ico", "*.png", "*.jpg", "*.jpeg", "*.gif", "*.svg", "*.md")

# Recursive function to read files and append their content
function Read-Files {
    param ($dir)
    Get-ChildItem -Path $dir -Recurse | ForEach-Object {
        if ($_.PSIsContainer) {
            if ($_.FullName -notlike "*node_modules*") {
                Read-Files -dir $_.FullName
            }
        } else {
            $should_ignore = $false
            foreach ($pattern in $ignore_files) {
                if ($_.FullName -like $pattern) {
                    $should_ignore = $true
                    break
                }
            }

            if (-not $should_ignore) {
                $relative_path = $_.FullName.Substring($project_dir.Length + 1)
                Add-Content -Path $output_file -Value "// File: $relative_path"
                Get-Content -Path $_.FullName | Add-Content -Path $output_file
                Add-Content -Path $output_file -Value ""
            }
        }
    }
}

# Call the recursive function for each specified directory in the project directory
foreach ($dir in $directories) {
    $fullPath = Join-Path $project_dir $dir
    if (Test-Path $fullPath) {
        Read-Files -dir $fullPath
    }
}

# Add package.json content
$packageJsonPath = Join-Path $project_dir "package.json"
if (Test-Path $packageJsonPath) {
    Add-Content -Path $output_file -Value "// File: package.json"
    Get-Content -Path $packageJsonPath | Add-Content -Path $output_file
    Add-Content -Path $output_file -Value ""
}

# Add README.md content if it exists
$readmePath = Join-Path $project_dir "README.md"
if (Test-Path $readmePath) {
    Add-Content -Path $output_file -Value "// File: README.md"
    Get-Content -Path $readmePath | Add-Content -Path $output_file
    Add-Content -Path $output_file -Value ""
}

Write-Host "Project context has been generated and saved to $output_file"

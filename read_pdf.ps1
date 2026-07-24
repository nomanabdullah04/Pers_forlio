$bytes = [System.IO.File]::ReadAllBytes("D:\Web Dev\Portfolio\Nexus_SRS_Document.pdf")
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
# Extract readable text portions
$readable = [regex]::Matches($text, '[\x20-\x7E]{4,}')
$output = $readable | ForEach-Object { $_.Value } | Where-Object { $_ -match '[a-zA-Z]' }
$output -join "`n" | Out-File "D:\Web Dev\Portfolio\pdf_text.txt" -Encoding UTF8
Write-Output "Done! Extracted $($output.Count) text segments"

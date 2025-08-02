@echo off
echo Creating deployment package for Render...

REM Create deployment directory
if exist "render-deploy" rmdir /s /q "render-deploy"
mkdir "render-deploy"

REM Copy necessary files
copy "package.json" "render-deploy\"
copy "package-lock.json" "render-deploy\"
copy "tsconfig.json" "render-deploy\"
copy "tsconfig.prod.json" "render-deploy\"

REM Copy source directory
xcopy "src" "render-deploy\src" /E /I

REM Copy dist if it exists
if exist "dist" xcopy "dist" "render-deploy\dist" /E /I

echo.
echo ✅ Deployment package created in 'render-deploy' folder
echo.
echo Next steps:
echo 1. Compress the 'render-deploy' folder into a ZIP file
echo 2. Upload the ZIP file to Render using manual deploy
echo 3. Use the build command: npm ci && npm run build
echo 4. Use the start command: npm start
echo.

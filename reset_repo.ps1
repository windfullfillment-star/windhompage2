# 윈드 홈페이지 저장소 초기화 스크립트
# https://github.com/windfullfillment-star/windhompage2

Write-Host ">>> 윈드 홈페이지 저장소 초기화를 시작합니다..." -ForegroundColor Cyan

# 1. 기존 .git 폴더 제거 (완전 초기화)
if (Test-Path .git) {
    Write-Host ">>> 기존 Git 이력을 삭제합니다..." -ForegroundColor Yellow
    Remove-Item -Path .git -Recurse -Force
}

# 2. Git 초기화
Write-Host ">>> 새 저장소를 생성합니다..." -ForegroundColor Cyan
git init

# 3. 리모트 연결
Write-Host ">>> GitHub 저장소를 연결합니다..." -ForegroundColor Cyan
git remote add origin https://github.com/windfullfillment-star/windhompage2.git

# 4. 브랜치 설정
git branch -M main

# 5. 파일 추가 (현재 폴더의 .gitignore 규칙을 따름)
Write-Host ">>> 홈페이지 파일을 추가합니다 (jungsan 폴더 제외)..." -ForegroundColor Cyan
git add .

# 6. 첫 커밋
Write-Host ">>> 초기 커밋을 생성합니다..." -ForegroundColor Cyan
git commit -m "Initialize homepage repository (Clean)"

# 7. GitHub로 업로드 (강제 푸시)
Write-Host ">>> GitHub로 코드를 업로드합니다..." -ForegroundColor Green
git push -u origin main --force

Write-Host "`n>>> 모든 작업이 완료되었습니다! GitHub 저장소를 확인해 주세요." -ForegroundColor Green
Write-Host ">>> 엔터를 누르면 창이 닫힙니다."
Read-Host

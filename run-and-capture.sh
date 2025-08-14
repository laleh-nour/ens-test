#!/bin/bash

# متغیرها
OUT_TEXT="poc-output.txt"
OUT_IMG="poc-screenshot.png"

# اجرای اسکریپت و ذخیره خروجی در فایل متنی
npx hardhat run scripts/poc-local.js --network localhost | tee "$OUT_TEXT"

# گرفتن اسکرین‌شات دستی از ترمینال
echo ""
echo "حالا موس رو ببر روی ترمینال و قسمت مورد نظر رو انتخاب کن..."
screencapture -i "$OUT_IMG"

echo ""
echo "✅ همه‌چیز آماده شد."
echo "📄 خروجی متنی: $OUT_TEXT"
echo "🖼  تصویر: $OUT_IMG"


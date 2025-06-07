# <strong> [![شرح طريقة تشغيل البوت كاملا]([https://img.youtube.com/vi/JxPRDzZspCM/0.jpg](https://media.discordapp.net/attachments/1275570135087972456/1381037170214830201/maxresdefault.jpg?ex=68460e97&is=6844bd17&hm=1cc279b3df1a59d689d0849108f74cf6bce5a148ebbe16507882be7cf2d65de5&=&format=webp&width=745&height=419))] <-> شرح طريقة تشغيل البوت كاملا </strong>

![Picsart_24-07-18_04-46-46-002]([https://github.com/user-attachments/assets/a07b551a-8694-4e79-9d18-93b773b756a4](https://github.com/xblue-studio))

# أوامر التشغيل وشرحها

```bash
cd Images
# انتقل إلى مجلد Images.

unzip -d . bg.zip
# فك ضغط ملف bg.zip في المجلد الحالي.

unzip -d . badges.zip
# فك ضغط ملف badges.zip في المجلد الحالي.

unzip -d . profile.zip
# فك ضغط ملف profile.zip في المجلد الحالي.

cd ../Bot
# انتقل إلى مجلد Bot الذي يعلو المجلد الحالي.

echo DISCORD_BOT_TOKEN= > .env
# أضف متغير البيئة DISCORD_BOT_TOKEN إلى ملف .env مع قيمة فارغة.
# قم بتعينها كما في شرح اليوتيوب

echo CLIENT_ID= >> .env
# أضف متغير البيئة CLIENT_ID إلى ملف .env مع قيمة فارغة.
# قم بتعينها كما في شرح اليوتيوب

echo CLIENT_SECRET= >> .env
# أضف متغير البيئة CLIENT_SECRET إلى ملف .env مع قيمة فارغة.
# قم بتعينها كما في شرح اليوتيوب

echo I8PHPSESSID= >> .env
# أضف متغير البيئة I8PHPSESSID إلى ملف .env مع قيمة فارغة.
# قم بتعينها كما في شرح اليوتيوب

npm i
# قم بتثبيت الحزم المحددة في ملف package.json.

npm i -g ts-node typescript
# قم بتثبيت ts-node و typescript عالميًا.

npm run test
# شغّل اختبارات المشروع المحددة في ملف package.json.
```

###### <a href="https://youtube.com/exa4ever" target="_blank">مقطع يوتيوب.</a>

# شرح الملف config.json

```json
{
  "prefix": "#",
  "redirectUri": "{link}/backend/user/callback",
  "clientId": "",
  "db": "json"
}
```

### جدول التوضيح

| المفتاح       | الوصف                                                                                                                                                                                              | القيمة المثال                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `prefix`      | بادئة الأوامر (لم تعد مستخدمة)                                                                                                                                                                     | `#`                            |
| `redirectUri` | رابط إعادة التوجيه بعد المصادقة. قم بتعيينه في بوابة مطوري Discord للتطبيق                                                                                                                         | `{link}/backend/user/callback` |
| `clientId`    | معرف العميل للتطبيق. احصل عليه من صفحة OAuth2 في بوابة مطوري Discord للتطبيق                                                                                                                       | `""`                           |
| `db`          | نوع قاعدة البيانات المستخدمة. في `index.ts`، يحدد سائق قاعدة البيانات المراد استخدامه. الأنواع المتاحة هي: `json` (لملفات JSON)، `mongo` (لقاعدة بيانات MongoDB)، و `memory` (للتخزين في الذاكرة). | `json`                         |

# 🏸 滨海林氏青年团 羽毛球赛程模拟器
### LIM Badminton Tournament Scheduler

马来西亚滨海林氏青年团 羽毛球友谊赛工具 · Tournament tools for our badminton friendly.

## 使用 How to use

**会员/球员 Members & players:**
👉 https://thyewei1128.github.io/lim-badminton/
- 🔍 输入名字查询自己的比赛时间和场地 (search your name → see your matches)
- 🧑‍⚖️ 裁判按 Coach 选场地号，看自己场地的赛程 (coaches: pick your court number)

**管理员 Admin only:**
👉 https://thyewei1128.github.io/lim-badminton/?admin
- 设置队伍数、名单、抽签，按「🌐 发布到网站」把最新赛程更新给所有人
- (Set teams/names, draw, then "Publish to Website" — everyone sees the update at the plain link)

**赛制 Format:**
- 每组比赛固定同一场地，裁判用「打印场地表」的小组积分表记录成绩 (胜=1分)
- 普通场: 单局 30 分 · 半决赛/决赛: 21 分三局两胜
- 每人只可报名 1 个项目 (One category per player)

## 文件 Files

| File | 说明 |
|---|---|
| `index.html` | 赛程模拟器 (排场 + 抽签 + 打印裁判表/计分表 + 羽毛球估算) |
| `create-registration-form.gs` | Google 报名表格生成脚本 — 贴进 script.google.com 运行 |

## 报名 Registration

报名表格链接由筹委会另行发布 (registration link shared separately by the committee).

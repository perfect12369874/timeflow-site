# TimeFlow 隐私政策

**最后更新：2026 年 5 月 27 日**

TimeFlow（"我们"、"本 App"）由独立开发者维护。我们重视你的隐私。本政策说明 TimeFlow 收集、使用、存储和共享数据的方式。

简而言之：

- 你的所有时间记录数据**默认保存在本地 SwiftData 数据库**。
- 我们**没有服务器**，没有账户系统，不收集分析数据。
- 只有当你**主动触发 AI 洞察**时，部分数据才会发送给你**自己配置的** AI 服务商（Anthropic / Google / DeepSeek / Moonshot）。
- 你随时可以选择上传给 AI 的数据范围（L1 / L2 / L3）。

---

## 1. 我们收集什么数据

TimeFlow 本身**不收集**任何数据到我们的服务器（因为我们没有服务器）。

App 在你的设备上读取或创建以下数据，**全部保存在本地**：

| 类型 | 用途 | 来源 | 存储位置 |
|---|---|---|---|
| 时间块（开始/结束/分类/项目） | 时间记录核心数据 | 你手动输入或被动同步 | 设备 SwiftData |
| 项目和分类 | 组织你的时间记录 | 你创建 | 设备 SwiftData |
| 睡眠数据 | 自动识别睡眠时段 | Apple HealthKit | 不离开设备 |
| 日历事件 | 自动识别会议 / 行程 | Apple EventKit | 不离开设备 |
| 运动数据 | 推断走路 / 驾驶时段 | Apple CoreMotion | 不离开设备 |
| 位置访问 | 识别家 / 工作地点 | Apple CoreLocation | 不离开设备，只保存聚类后的"地点"标签 |
| AI 服务商 API Key | 调用你选的 AI | 你粘贴输入 | iOS Keychain（仅本设备解锁时可访问） |
| AI 洞察结果 | 缓存生成的报告 | 由 AI 调用返回 | 设备 SwiftData |

我们**不收集**：
- 你的姓名、邮箱、电话或任何账户标识
- 你的设备 ID、广告 ID
- 应用使用统计（页面访问、按钮点击）
- 崩溃报告（除非你主动通过邮件附上）

---

## 2. 数据如何离开你的设备

TimeFlow 默认**完全离线工作**。数据离开你的设备**只有一种情况**：

### 你主动触发 AI 洞察

当你点"生成 AI 洞察"或"深度解读"按钮时，TimeFlow 会向你**自己选择并配置 API Key 的** AI 服务商发起一次 HTTPS 请求。请求 payload 取决于你在「设置 → AI 隐私级别」选择的等级：

#### L1 · 隐私优先（默认）
只发送聚合统计：
- 各分类时长占比（如「工作 41%」）
- 每日睡眠总分钟数
- 最长工作连续天数等指标

不发送：项目名、会议标题、地点、原始时间块。

#### L2 · 匿名上下文
在 L1 基础上 + 匿名化的时间块图案：
- 时间块的起止时间、分类、时长
- **不发送**项目名（替换为 `Project A / B / C`）
- **不发送**会议标题、地点、备注

#### L3 · 完整上下文
在 L2 基础上 + 项目名、会议标题、运动细节。

**只有 L3 会包含可能识别你身份的内容**（如项目名"我和老婆的旅行计划"会原样发出）。L3 默认关闭，需手动开启。

### AI 服务商如何处理你的数据

TimeFlow 当前支持 4 个 AI 服务商。每家的隐私政策由其各自管理：

- **Anthropic（Claude）** — <https://www.anthropic.com/legal/privacy>
- **Google（Gemini）** — <https://policies.google.com/privacy>
- **DeepSeek** — <https://platform.deepseek.com/privacy>
- **Moonshot（Kimi）** — <https://www.moonshot.cn/privacy>

我们建议你在使用前阅读你选定服务商的隐私政策。**TimeFlow 与上述任何一家都无商业关系或数据共享协议**。

---

## 3. 你的 API Key

- API Key 由你**自带**（从 Anthropic / Google / DeepSeek / Moonshot 控制台获取）
- 存储在 **iOS Keychain**，属性为 `kSecAttrAccessibleWhenUnlockedThisDeviceOnly`
- **不会**通过 iCloud 同步到你的其他设备
- 你删除 App 即清除 Keychain 中所有 TimeFlow 项

---

## 4. iCloud 同步（可选）

如果你在「设置 → iCloud 同步」中开启该功能：

- 时间块、项目、分类等数据会通过 **NSPersistentCloudKitContainer** 同步到你私有的 iCloud Drive
- 数据仅在你的 Apple ID 之间同步，Apple 无法读取（端对端加密由 CloudKit 提供）
- **API Key 不会被 iCloud 同步**，需在新设备重新填入

---

## 5. 数据保留与删除

- 你的数据在设备上保留，直到**你主动删除**或**卸载 App**
- 在「设置 → 数据与隐私」中可以一键导出（JSON / CSV）或清空所有数据
- AI 服务商保留你请求数据的时长由各家政策决定 —— TimeFlow 无法控制

---

## 6. 儿童

TimeFlow 不针对 13 岁以下儿童设计，不会有意收集任何儿童数据。

---

## 7. 政策变更

如本政策有重大变更，我们会在 App 内提示并在此页面更新"最后更新"日期。继续使用即表示你接受变更。

---

## 8. 联系方式

如对本政策或你的数据有任何疑问，请发邮件至：

📧 **timeflow.app@gmail.com**

GitHub Issues： <https://github.com/perfect12369874/timeflow-ios/issues>（公开）

---

*TimeFlow 是独立开发者作品，不属于任何公司。*

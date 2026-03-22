---
title: "看板"
difficulty: "medium"
duration: "60 分钟"
description: "构建一个支持拖拽的交互式看板，通过 API 与 GitHub Issues 同步"
---

# 看板

构建一个与真实 GitHub 仓库 Issues 同步的交互式看板。

## 需求

### 核心功能（必须实现）
1. **GitHub 集成**：连接 GitHub 公共 API，从任意公开仓库获取 Issues，并在看板上以任务卡片的形式展示
2. **列**：至少包含 3 个列——"待处理"、"进行中"、"已关闭"——映射到 GitHub Issue 的标签或状态
3. **拖拽操作**：通过拖拽在列之间移动任务卡片；在可行的情况下通过 API 更新 Issue 的状态/标签
4. **实时同步**：页面加载时获取最新 Issues，并提供刷新按钮；在 API 调用期间显示加载状态
5. **数据持久化**：看板布局和所有本地自定义设置在页面刷新后必须保留

### API 集成
- 使用 **GitHub REST API**（`api.github.com`）——公开仓库无需身份验证
- 为用户指定的仓库获取 Issues、标签和指派人信息
- 展示 Issue 元数据：标题、标签、指派人头像、创建日期、评论数
- 优雅处理 API 速率限制（达到限制时显示提示信息）

### 界面要求
- 优先级可视化标识（按标签颜色编码）
- 流畅的拖拽交互体验
- 显示来自 GitHub 的指派人头像
- 响应式布局

## 技术说明
- 可使用任意技术栈
- 拖拽功能可使用任意库（dnd-kit、react-beautiful-dnd 等）或原生 HTML5 拖拽 API
- GitHub API 文档：https://docs.github.com/en/rest/issues
- 注重流畅、直观的用户体验

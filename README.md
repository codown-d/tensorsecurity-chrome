# README

测试产品 目前两个 探真、中信建投

1.  网络流量的过滤模块开发

任何http请求都监听还是 值需要固定某些功能的网络流量

export interface EntityNetwork { id?: string // 主键id-details.requestId mid?: string // 元数据id url: string // 网络请求URL method: string // 请求方法（GET, POST, PUT等）code: string // 返回的状态码  
 post: string // 请求的数据 headers?: Record<string, string> // 请求头信息 responseHeaders?: Record<string, string> // 响应头

}

2.  事件-p1 Meta此接口用于描述网页的元数据，并包含关于页面事件的详细信息，如页面元素及其事件类型。export interface EntityMeta { id?: string // 元数据id pid?: string // 项目id url: string // 页面URL，注意是完整的URL，包括domain tabId: number // 浏览器Tab的ID title: string // 页面标题cookies?: string[] // 页面相关的cookies timestamp: number // 时间戳，记录数据收集的时间loadTime?: number // 页面加载时间，单位ms

        // 事件信息 (事件数组)
        events?: Array<{
            event_type: string      // 事件类型，如 "context"
            type: string            // 内容类型，如 "text", "table", "list", "header", "tab", "image", "button", "href"
            elements: Array<{
                id: string          // 元素的ID
                xpath: string       // 元素的XPath路径
                text?: string       // 元素的文本内容（如果有）
                tag: string         // 元素的HTML标签，如 "li", "tr", "div", "td"
                attributes?: Record<string, string>  // 元素的属性，如 { "class": "btn" }
            }>
        }>

    }

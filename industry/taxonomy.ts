// 这个行业的分类体系：类别、标签词表、学校与机构名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉模型怎么归类。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 */
export const CATEGORIES = [
  { key: "school-notice", label: "学校通知", section: "学校通知", guide: "UBC 与澳门城市大学及其院系、学生会、教务和行政部门发布的正式通知与公告：校历与假期、注册与缴费安排、停课与调整、校园服务与设施、行政流程" },
  { key: "academics", label: "学业与课程", section: "学业与课程", guide: "选课、退课与旁听，考试与成绩，毕业与学位要求，专业与课程设置，证书课程与开课信息（如 Six Sigma），语言考试与学术规范" },
  { key: "campus-life", label: "校园生活", section: "校园生活", guide: "社团与学生活动、志愿服务、住宿与租房、食堂与饮食、校园设施与兼职打工、学生社区里的日常讨论" },
  { key: "fitness", label: "健身与运动", section: "健身与运动", guide: "健身房与运动场馆、健身与运动课程（团课、私教、瑜伽、攀岩等）、校园体育设施与赛事、学生价格与优惠" },
  { key: "beauty", label: "美容与形象", section: "美容与形象", guide: "美容与护肤：产品与趋势、门店与服务、学生折扣、皮肤健康常识、穿搭与形象" },
  { key: "food", label: "本地美食", section: "本地美食", guide: "温哥华与澳门的餐厅、咖啡馆与新店开业、优惠与折扣、外卖与团购、饮食活动与市集" },
  { key: "marketplace", label: "二手与生活", section: "二手与生活", guide: "二手买卖信息（课本、家具、电子产品、二手车）、租房与转租、拼车、家政与生活服务、生活成本" },
  { key: "transit", label: "交通与出行", section: "交通与出行", guide: "公共交通与线路变化、票价与月票、学生票与优惠、驾车与驾照、机场与跨境交通、骑行与步行设施" },
  { key: "events", label: "演出与会展", section: "演出与会展", guide: "演唱会、巡演与音乐节（欧美、日韩等艺人）、剧院与场馆演出、会展与展览、漫展与同人展、开票与售票时间、学生票" },
  { key: "tip", label: "攻略与经验", section: "攻略与经验", guide: "可直接照做的攻略与经验：办事流程、选课与选专业、租房与搬家、签证与报税、省钱与避坑、生活清单与教程" },
  { key: "city-life", label: "城市资讯", section: "城市资讯", guide: "温哥华与澳门的城市信息：天气与预警、市政与政府政策、城市服务与公共设施、物价与消费、治安与安全提醒、城市新闻" },
] as const;

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["official_notice", "policy_change", "deadline_reminder", "deal_discount", "guide_tip", "news_event", "discussion_opinion", "safety_alert"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "学校通知", "学业/课程", "校园生活", "城市/生活", "消费/优惠", "健康/形象", "文化活动", "费用/奖助", "机会/实习",
  "攻略/经验", "社区讨论", "新闻/资讯", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "选课与注册", "考试与成绩", "毕业与学位", "专业与课程", "证书/考试", "Six Sigma", "开课与报名",
  "住宿与租房", "食堂与饮食", "社团", "学生活动", "健身", "运动场馆", "美容", "护肤",
  "美食", "新店与优惠", "二手交易", "二手车", "拼车",
  "天气", "交通", "学生票与月票",
  "二次元", "漫展", "cosplay", "同人", "演唱会", "K-pop", "欧美演出", "音乐节", "会展", "展览",
  "实习与co-op", "交换与留学", "奖学金与助学金", "学费与缴费", "学生保险", "兼职与打工",
  "心理健康", "医疗与疫苗", "签证与移民", "安全与防诈骗", "学生优惠", "葡萄牙语", "应用生物学", "温哥华", "澳门",
] as const;

/** 可选的实体标签（学校、机构、政府部门、平台）。 */
export const ENTITY_TAGS = ["UBC", "UBC LFS", "UBC AMS", "澳门城市大学", "澳门特区政府", "温哥华市政府", "TransLink", "DSEDJ"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  "通知/公告": "学校通知", 通知: "学校通知", 公告: "学校通知", 校方通知: "学校通知", 官方通知: "学校通知", 招生通知: "学校通知",
  学业: "学业/课程", "选课/学业": "学业/课程", 学术: "学业/课程", 选课: "选课与注册", 注册: "选课与注册", 加退课: "选课与注册",
  考试: "考试与成绩", 成绩: "考试与成绩", 毕业: "毕业与学位", 学位: "毕业与学位", 课程: "专业与课程", 专业: "专业与课程",
  证书: "证书/考试", 认证课程: "证书/考试", 证书课程: "证书/考试", 六西格玛: "Six Sigma", "six sigma": "Six Sigma",
  开课: "开课与报名", 报名: "开课与报名", 招生简章: "开课与报名",
  宿舍: "住宿与租房", 住宿: "住宿与租房", 租房: "住宿与租房", 转租: "住宿与租房",
  食堂: "食堂与饮食", 餐饮: "食堂与饮食", 社团: "社团", 俱乐部: "社团", 活动: "学生活动", 学生组织: "学生活动",
  健身房: "健身", 运动: "健身", 体育: "健身", 瑜伽: "健身", 场馆: "运动场馆",
  美容护肤: "美容", 护肤: "护肤", 美妆: "美容", 皮肤: "护肤",
  餐厅: "美食", 探店: "美食", 咖啡: "美食", 优惠: "学生优惠", 折扣: "学生优惠", 促销: "新店与优惠",
  二手: "二手交易", 闲置: "二手交易", 卖车: "二手车", 买车: "二手车", 汽车: "二手车", 顺风车: "拼车",
  天气预警: "天气", 气候: "天气", 台风: "天气",
  公交: "交通", 地铁: "交通", 巴士: "交通", 轻轨: "交通", 公共交通: "交通", 月票: "学生票与月票", 学生票: "学生票与月票",
  动漫: "二次元", ACG: "二次元", "acg": "二次元", 漫画展: "漫展", 同人展: "同人", cos: "cosplay",
  演出: "演唱会", 巡演: "演唱会", 音乐会: "演唱会", "kpop": "K-pop", 韩流: "K-pop", 欧美艺人: "欧美演出",
  展会: "会展", 展览会: "展览", 市集: "展览",
  实习: "实习与co-op", "co-op": "实习与co-op", coop: "实习与co-op", 带薪实习: "实习与co-op",
  交换: "交换与留学", 留学: "交换与留学", 海外学习: "交换与留学",
  奖学金: "奖学金与助学金", 助学金: "奖学金与助学金", 学费: "学费与缴费", 缴费: "学费与缴费", 杂费: "学费与缴费",
  保险: "学生保险", 医保: "学生保险", 兼职: "兼职与打工", 打工: "兼职与打工",
  心理: "心理健康", 心理咨询: "心理健康", 医疗: "医疗与疫苗", 疫苗: "医疗与疫苗", 看病: "医疗与疫苗",
  签证: "签证与移民", 学签: "签证与移民", 移民: "签证与移民", 诈骗: "安全与防诈骗", 治安: "安全与防诈骗",
  葡语: "葡萄牙语", portuguese: "葡萄牙语", 应用生物: "应用生物学", "applied biology": "应用生物学",
  温哥华: "温哥华", vancouver: "温哥华", 澳门: "澳门", macau: "澳门", macao: "澳门",
  城市: "城市/生活", 生活: "城市/生活", 城市资讯: "城市/生活", 费用: "费用/奖助", 奖助: "费用/奖助",
  机会: "机会/实习", 招聘: "机会/实习", 健康: "健康/形象", 形象: "健康/形象", 消费: "消费/优惠",
  文化: "文化活动", 二次元与漫展: "文化活动", 演出与会展: "文化活动", 攻略: "攻略/经验", 经验: "攻略/经验", 教程: "攻略/经验",
  讨论: "社区讨论", 社区: "社区讨论", 观点: "社区讨论", 新闻: "新闻/资讯", 资讯: "新闻/资讯", 通告: "学校通知",
  非校园: "其他", 通用: "其他",
};

/** 模型漏了分类标签时，按内容类型补一个。 */
export const CATEGORY_BY_ITEM_TYPE: Readonly<Record<string, string>> = {
  official_notice: "学校通知", policy_change: "学校通知", deadline_reminder: "学业/课程", deal_discount: "消费/优惠",
  guide_tip: "攻略/经验", news_event: "新闻/资讯", discussion_opinion: "社区讨论", safety_alert: "城市/生活",
};

// ── 学校与机构 ──────────────────────────────────────────────────────────────────────────

/** 机构主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[] }> = {
  ubc: { name: "UBC 不列颠哥伦比亚大学", displayTag: "UBC", aliases: ["UBC", "University of British Columbia", "不列颠哥伦比亚大学", "英属哥伦比亚大学"] },
  "ubc-lfs": { name: "UBC 土地与食品系统学院（LFS）", displayTag: "UBC LFS", aliases: ["UBC LFS", "Faculty of Land and Food Systems", "Land and Food Systems", "土地与食品系统学院", "应用生物学", "Applied Biology"] },
  "ubc-ams": { name: "UBC 学生会 AMS", displayTag: "UBC AMS", aliases: ["Alma Mater Society", "UBC AMS", "AMS", "UBC 学生会"] },
  "cityu-macau": { name: "澳门城市大学", displayTag: "澳门城市大学", aliases: ["City University of Macau", "Universidade da Cidade de Macau", "澳门城市大学", "城大"] },
  "macau-gov": { name: "澳门特别行政区政府", displayTag: "澳门特区政府", aliases: ["Macau SAR Government", "Governo da RAEM", "澳门特区政府", "澳门政府"] },
  dsedj: { name: "澳门教育及青年发展局", displayTag: null, aliases: ["DSEDJ", "教育及青年发展局", "教青局"] },
  "vancouver-city": { name: "温哥华市政府", displayTag: "温哥华市政府", aliases: ["City of Vancouver", "温哥华市政府", "温哥华市"] },
  translink: { name: "TransLink 大温交通局", displayTag: null, aliases: ["TransLink", "大温交通局", "运联"] },
};

/**
 * 身份词典：摘要和标题里出现的学校或机构，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "ubc", name: "UBC 不列颠哥伦比亚大学", patterns: [/\bubc\b|University of British Columbia|不列颠哥伦比亚大学|英属哥伦比亚大学/i] },
  { id: "ubc-lfs", name: "UBC 土地与食品系统学院（LFS）", patterns: [/land and food systems|土地与食品系统|\blfs\b|applied biology|应用生物学/i] },
  { id: "ubc-ams", name: "UBC 学生会 AMS", patterns: [/alma mater society|\bams\b|UBC 学生会/i] },
  { id: "cityu-macau", name: "澳门城市大学", patterns: [/city university of macau|universidade da cidade de macau|澳门城市大学/i] },
  { id: "macau-gov", name: "澳门特别行政区政府", patterns: [/macau sar government|governo da raem|澳门特区政府|澳门政府|澳门特别行政区政府/i] },
  { id: "dsedj", name: "澳门教育及青年发展局", patterns: [/\bdsedj\b|教育及青年发展局|教青局/i] },
  { id: "vancouver-city", name: "温哥华市政府", patterns: [/city of vancouver|温哥华市政府|温哥华市议会|温哥华市长/i] },
  { id: "translink", name: "TransLink 大温交通局", patterns: [/translink|大温交通局/i] },
];

/** 这些域名上的文章，发布方就是对应的机构（托管平台如 Reddit、CBC 不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "ubc", domains: ["ubc.ca"] },
  { entityId: "cityu-macau", domains: ["cityu.mo"] },
  { entityId: "macau-gov", domains: ["gov.mo"] },
  { entityId: "vancouver-city", domains: ["vancouver.ca"] },
  { entityId: "translink", domains: ["translink.ca"] },
];

/** 原文里的这些写法也算提到了对应机构。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "ubc-ams", pattern: /\bAMS\s+(?:Student|UBC)\b/ },
  { entityId: "macau-gov", pattern: /\bRAEM\b/ },
];

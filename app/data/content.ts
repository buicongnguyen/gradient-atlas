import { curriculumSeeds, type Collection, type PageKind } from "./full-curriculum";
import {
  formulaSupportBySlug,
  localizedTerminology,
  type TerminologyPair,
} from "./learning-support";
import { getLearningProfile, getTopicDepth } from "./topic-depth";
import { getTopicCode } from "./topic-code";

export const languages = ["en", "vi", "ko"] as const;
export type Language = (typeof languages)[number];

export type LessonSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  formula?: string;
  formulaVariables?: string[];
  formulaSteps?: Array<{
    label: string;
    expression: string;
    explanation: string;
    components: string[];
    nextReason?: string;
    isResult: boolean;
  }>;
  code?: string;
  note?: string;
};

export type Lesson = {
  id: string;
  sourcePageId: number;
  collection: Collection;
  kind: PageKind;
  tags: string[];
  featured: boolean;
  part: string;
  number: string;
  slug: string;
  title: string;
  englishTitle?: string;
  terminology?: TerminologyPair[];
  summary: string;
  duration: string;
  outcome: string;
  sections: LessonSection[];
  exercise: string;
};

type LessonDraft = Omit<
  Lesson,
  "sourcePageId" | "collection" | "kind" | "tags" | "featured"
>;

type UiCopy = {
  siteTitle: string;
  siteSubtitle: string;
  nav: { map: string; lessons: string; labs: string; about: string };
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroBody: string;
  start: string;
  explore: string;
  preview: string;
  mapEyebrow: string;
  mapTitle: string;
  mapBody: string;
  published: string;
  planned: string;
  labEyebrow: string;
  labTitle: string;
  labBody: string;
  lessonEyebrow: string;
  lessonTitle: string;
  lessonBody: string;
  read: string;
  minutes: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutBody: string;
  original: string;
  sourcePolicy: string;
  humanReview: string;
  previous: string;
  next: string;
  exercise: string;
  onThisPage: string;
  allLessons: string;
  time: string;
  outcome: string;
  status: string;
  exerciseHint: string;
  relatedOutline: string;
  outlineAttribution: string;
  catalog: string;
  catalogTitle: string;
  catalogBody: string;
  search: string;
  allCollections: string;
  fundamentals: string;
  legacy: string;
  pages: string;
  bookContents: string;
  openContents: string;
  closeContents: string;
  currentPage: string;
  readerProgress: string;
  skipToArticle: string;
  terminology: string;
  englishTerm: string;
  formulaVariables: string;
};

export const ui: Record<Language, UiCopy> = {
  en: {
    siteTitle: "Gradient Atlas",
    siteSubtitle: "Machine learning, clearly mapped",
    nav: { map: "Map", lessons: "Lessons", labs: "Labs", about: "About" },
    heroEyebrow: "A visual field guide to machine learning",
    heroTitle: "Learn the decisions,",
    heroAccent: "not just the definitions.",
    heroBody:
      "Build one late-delivery risk system across six guided chapters. Frame the decision, protect the evaluation, choose an operating point, and monitor what changes.",
    start: "Start the guided course",
    explore: "See the six steps",
    preview: "Editorial preview · human review pending",
    mapEyebrow: "01 · Guided course",
    mapTitle: "Six chapters. One project. A visible chain of decisions.",
    mapBody:
      "The recommended path follows a late-delivery warning from problem framing to operation. Each chapter maps its reasoning, adds one artifact, and closes with Python practice and explained checks.",
    published: "Catalog live",
    planned: "Planned",
    labEyebrow: "02 · Interactive labs",
    labTitle: "Change an assumption. Watch the conclusion move.",
    labBody:
      "The labs turn three common sources of confusion into small experiments you can control.",
    lessonEyebrow: "03 · Reference atlas",
    lessonTitle: "Look up a topic without losing the learning path.",
    lessonBody:
      "The other 116 pages are topic-specific reference lessons with a core explanation, worked example, failure check, exercise, and deeper sources. Use them when the guided project reaches a model, formula, or operational question.",
    read: "Read lesson",
    minutes: "min",
    aboutEyebrow: "04 · Publishing policy",
    aboutTitle: "Original first. Attributed when adapted.",
    aboutBody:
      "Gradient Atlas is reconstructed from original explanations and a traceable reference library. Microsoft informs the project rhythm, Google the concise interactive modules, D2L the math–code pairing, and scikit-learn the implementation checks. WikiDocs remains a historical topic link only; its prose and media are not copied or translated.",
    original: "Original content",
    sourcePolicy: "View reference policy",
    humanReview: "Human review pending",
    previous: "Previous",
    next: "Next",
    exercise: "Try it yourself",
    onThisPage: "On this page",
    allLessons: "All lessons",
    time: "Time",
    outcome: "Outcome",
    status: "Status",
    exerciseHint: "Write your assumptions before checking an answer. The goal is to make the reasoning inspectable.",
    relatedOutline: "Historical WikiDocs topic",
    outlineAttribution: "This link records the topic that appeared in the earlier WikiDocs index. Gradient Atlas does not reproduce or translate the linked page.",
    catalog: "Browse the reference atlas",
    catalogTitle: "Six guided chapters, 116 reference lessons",
    catalogBody: "Search the complete 122-topic atlas in English, Vietnamese, and Korean. Follow the six guided chapters first; each reference lesson then teaches one model, formula, workflow, or failure pattern with a worked example.",
    search: "Search titles and concepts",
    allCollections: "All collections",
    fundamentals: "Core reference",
    legacy: "Extended reference",
    pages: "pages",
    bookContents: "Book contents",
    openContents: "Open book contents",
    closeContents: "Close book contents",
    currentPage: "Current page",
    readerProgress: "Reader progress",
    skipToArticle: "Skip to the lesson",
    terminology: "Key terminology",
    englishTerm: "Canonical English term",
    formulaVariables: "Symbols",
  },
  vi: {
    siteTitle: "Gradient Atlas",
    siteSubtitle: "Bản đồ học máy rõ ràng",
    nav: { map: "Bản đồ", lessons: "Bài học", labs: "Phòng lab", about: "Giới thiệu" },
    heroEyebrow: "Cẩm nang trực quan về học máy",
    heroTitle: "Học cách ra quyết định,",
    heroAccent: "không chỉ học định nghĩa.",
    heroBody:
      "Xây dựng một hệ thống dự báo giao hàng trễ qua sáu chương có hướng dẫn. Định khung quyết định, bảo vệ phép đánh giá, chọn điểm vận hành và theo dõi thay đổi.",
    start: "Bắt đầu khóa học",
    explore: "Xem sáu bước",
    preview: "Bản xem trước · đang chờ phản biện",
    mapEyebrow: "01 · Khóa học có hướng dẫn",
    mapTitle: "Sáu chương. Một dự án. Một chuỗi quyết định nhìn thấy được.",
    mapBody:
      "Lộ trình khuyến nghị theo một cảnh báo giao hàng trễ từ định nghĩa bài toán đến vận hành. Mỗi chương vẽ luồng suy luận, bổ sung một sản phẩm rồi kết thúc bằng thực hành Python và câu hỏi có giải thích.",
    published: "Danh mục đã mở",
    planned: "Đang lên kế hoạch",
    labEyebrow: "02 · Phòng lab tương tác",
    labTitle: "Thay đổi giả định. Quan sát kết luận dịch chuyển.",
    labBody:
      "Ba thí nghiệm nhỏ giúp biến những nhầm lẫn phổ biến thành điều bạn có thể tự kiểm chứng.",
    lessonEyebrow: "03 · Atlas tra cứu",
    lessonTitle: "Tra cứu chủ đề mà không làm mất lộ trình học.",
    lessonBody:
      "116 trang còn lại là các bài học tra cứu theo từng chủ đề, có giải thích cốt lõi, ví dụ có lời giải, kiểm tra thất bại, bài tập và nguồn học sâu hơn. Hãy mở chúng khi dự án có câu hỏi về mô hình, công thức hoặc vận hành.",
    read: "Đọc bài",
    minutes: "phút",
    aboutEyebrow: "04 · Chính sách xuất bản",
    aboutTitle: "Ưu tiên nội dung gốc. Ghi nguồn khi chuyển thể.",
    aboutBody:
      "Gradient Atlas được tái cấu trúc bằng giải thích nguyên bản và thư viện tham khảo có thể truy vết. Microsoft gợi ý nhịp dự án, Google gợi ý mô-đun ngắn và tương tác, D2L gợi ý cách nối toán với mã, còn scikit-learn dùng để kiểm tra triển khai. WikiDocs chỉ còn là liên kết lịch sử; nội dung của họ không được sao chép hoặc dịch.",
    original: "Nội dung nguyên bản",
    sourcePolicy: "Xem chính sách tham khảo",
    humanReview: "Đang chờ phản biện",
    previous: "Bài trước",
    next: "Bài tiếp",
    exercise: "Tự thực hành",
    onThisPage: "Trong bài này",
    allLessons: "Tất cả bài học",
    time: "Thời lượng",
    outcome: "Kết quả",
    status: "Trạng thái",
    exerciseHint: "Hãy viết các giả định trước khi kiểm tra đáp án. Mục tiêu là làm cho lập luận có thể được xem xét.",
    relatedOutline: "Chủ đề WikiDocs trước đây",
    outlineAttribution: "Liên kết này ghi nhận chủ đề từng xuất hiện trong mục lục WikiDocs. Gradient Atlas không tái bản hoặc dịch trang được liên kết.",
    catalog: "Mở atlas tra cứu",
    catalogTitle: "Sáu chương có hướng dẫn, 116 bài học tra cứu",
    catalogBody: "Tìm kiếm atlas 122 chủ đề bằng tiếng Anh, tiếng Việt và tiếng Hàn. Hãy học sáu chương có hướng dẫn trước; sau đó mỗi bài tra cứu sẽ dạy một mô hình, công thức, quy trình hoặc kiểu thất bại bằng ví dụ có lời giải.",
    search: "Tìm theo tiêu đề và khái niệm",
    allCollections: "Tất cả bộ sưu tập",
    fundamentals: "Tham khảo cốt lõi",
    legacy: "Tham khảo mở rộng",
    pages: "trang",
    bookContents: "Mục lục sách",
    openContents: "Mở mục lục sách",
    closeContents: "Đóng mục lục sách",
    currentPage: "Trang hiện tại",
    readerProgress: "Tiến độ đọc",
    skipToArticle: "Chuyển đến bài học",
    terminology: "Thuật ngữ Việt–Anh",
    englishTerm: "Thuật ngữ tiếng Anh chuẩn",
    formulaVariables: "Ký hiệu",
  },
  ko: {
    siteTitle: "Gradient Atlas",
    siteSubtitle: "명확하게 연결한 머신러닝 지도",
    nav: { map: "학습 지도", lessons: "레슨", labs: "실험실", about: "소개" },
    heroEyebrow: "머신러닝을 위한 시각적 필드 가이드",
    heroTitle: "정의만 외우지 말고,",
    heroAccent: "결정의 이유를 배우세요.",
    heroBody:
      "여섯 개의 가이드 장에서 하나의 배송 지연 위험 시스템을 만드세요. 의사결정을 정의하고 평가를 보호하며 운영점을 고르고 변화를 모니터링합니다.",
    start: "가이드 코스 시작",
    explore: "여섯 단계 보기",
    preview: "편집 프리뷰 · 사람의 검토 대기 중",
    mapEyebrow: "01 · 가이드 코스",
    mapTitle: "여섯 장. 하나의 프로젝트. 눈에 보이는 의사결정 사슬.",
    mapBody:
      "권장 경로는 배송 지연 경보를 문제 정의부터 운영까지 따라갑니다. 각 장은 사고 흐름을 그리고 하나의 결과물을 더한 뒤 Python 실습과 해설형 점검으로 마무리합니다.",
    published: "카탈로그 공개",
    planned: "준비 중",
    labEyebrow: "02 · 인터랙티브 실험실",
    labTitle: "가정을 바꾸고, 결론이 움직이는 모습을 보세요.",
    labBody:
      "자주 혼동하는 세 가지 개념을 직접 조절할 수 있는 작은 실험으로 바꿨습니다.",
    lessonEyebrow: "03 · 참고 아틀라스",
    lessonTitle: "학습 경로를 잃지 않고 필요한 주제를 찾아보세요.",
    lessonBody:
      "나머지 116개 페이지는 핵심 설명, 풀이 예제, 실패 점검, 연습문제, 심화 자료를 갖춘 주제별 참고 레슨입니다. 가이드 프로젝트에서 모델, 수식, 운영 질문이 생길 때 활용하세요.",
    read: "레슨 읽기",
    minutes: "분",
    aboutEyebrow: "04 · 출판 원칙",
    aboutTitle: "먼저 독창적으로 쓰고, 각색할 때는 출처를 밝힙니다.",
    aboutBody:
      "Gradient Atlas는 독창적인 설명과 추적 가능한 참고 자료로 재구성합니다. Microsoft에서는 프로젝트 흐름을, Google에서는 짧은 상호작용 모듈을, D2L에서는 수학과 코드의 연결을, scikit-learn에서는 구현 검증을 참고합니다. WikiDocs는 과거 주제 링크로만 남기며 본문과 미디어를 복제하거나 번역하지 않습니다.",
    original: "독창적 콘텐츠",
    sourcePolicy: "참고 자료 정책 보기",
    humanReview: "사람의 검토 대기 중",
    previous: "이전",
    next: "다음",
    exercise: "직접 해보기",
    onThisPage: "이 페이지에서",
    allLessons: "전체 레슨",
    time: "학습 시간",
    outcome: "학습 결과",
    status: "상태",
    exerciseHint: "답을 확인하기 전에 가정을 적어 보세요. 추론 과정을 검토할 수 있게 만드는 것이 목표입니다.",
    relatedOutline: "과거 WikiDocs 주제",
    outlineAttribution: "이 링크는 이전 WikiDocs 색인에 있던 주제를 기록합니다. Gradient Atlas는 링크된 페이지를 복제하거나 번역하지 않습니다.",
    catalog: "참고 아틀라스 열기",
    catalogTitle: "여섯 개의 가이드 장과 116개 참고 레슨",
    catalogBody: "영어·베트남어·한국어로 된 122개 주제 아틀라스를 검색하세요. 먼저 여섯 개의 가이드 장을 따라가고, 이후 각 참고 레슨에서 풀이 예제와 함께 모델·수식·워크플로·실패 패턴을 학습하세요.",
    search: "제목과 개념 검색",
    allCollections: "전체 컬렉션",
    fundamentals: "핵심 참고",
    legacy: "확장 참고",
    pages: "페이지",
    bookContents: "책 목차",
    openContents: "책 목차 열기",
    closeContents: "책 목차 닫기",
    currentPage: "현재 페이지",
    readerProgress: "읽기 진행률",
    skipToArticle: "레슨으로 건너뛰기",
    terminology: "한영 핵심 용어",
    englishTerm: "표준 영어 용어",
    formulaVariables: "기호",
  },
};

export const roadmap = {
  en: [
    ["A", "Foundations", "Ask what can be learned", true],
    ["B", "Data & labels", "Define the evidence", true],
    ["C", "Training & validation", "Protect the evaluation", true],
    ["D", "Metrics", "Measure the right failure", true],
    ["E", "Generalization", "Control the gap", true],
    ["F", "Workflow", "Join the decisions", true],
    ["G", "System design", "Operate at scale", true],
    ["H", "Pitfalls", "Recognize failure patterns", true],
    ["K", "Projects", "Prove understanding", true],
  ],
  vi: [
    ["A", "Nền tảng", "Xác định điều có thể học", true],
    ["B", "Dữ liệu & nhãn", "Định nghĩa bằng chứng", true],
    ["C", "Huấn luyện & thẩm định", "Bảo vệ phép đánh giá", true],
    ["D", "Chỉ số", "Đo đúng kiểu sai", true],
    ["E", "Khả năng khái quát", "Kiểm soát khoảng cách", true],
    ["F", "Quy trình", "Kết nối các quyết định", true],
    ["G", "Thiết kế hệ thống", "Vận hành ở quy mô lớn", true],
    ["H", "Cạm bẫy", "Nhận diện kiểu thất bại", true],
    ["K", "Dự án", "Chứng minh mức độ hiểu", true],
  ],
  ko: [
    ["A", "기초", "무엇을 학습할지 묻기", true],
    ["B", "데이터와 레이블", "증거를 정의하기", true],
    ["C", "학습과 검증", "평가를 보호하기", true],
    ["D", "평가 지표", "중요한 실패를 측정하기", true],
    ["E", "일반화", "간극을 제어하기", true],
    ["F", "워크플로", "결정을 연결하기", true],
    ["G", "시스템 설계", "규모 있게 운영하기", true],
    ["H", "함정", "실패 패턴 알아보기", true],
    ["K", "프로젝트", "이해를 증명하기", true],
  ],
} satisfies Record<Language, (string | boolean)[][]>;

const lessonsEn: LessonDraft[] = [
  {
    id: "mlf-a-01",
    part: "A",
    number: "01",
    slug: "what-machine-learning-learns",
    title: "What machine learning actually learns",
    summary: "Turn observations into a precise learning problem before choosing a model.",
    duration: "8",
    outcome: "Distinguish task, representation, objective, and evidence.",
    sections: [
      {
        heading: "A model learns a rule, not a purpose",
        paragraphs: [
          "A learning algorithm searches for parameters that make a measurable objective smaller on observed examples. It does not discover why the project matters. People choose the outcome, the available evidence, the acceptable errors, and the conditions in which the result will be used.",
          "That distinction prevents a common category error: a high score can prove that a model optimized the chosen test, but it cannot prove that the test represents the real decision.",
        ],
        note: "Begin every project with the decision and its consequences, not with a model name.",
      },
      {
        heading: "Four pieces define the learning problem",
        paragraphs: [
          "A task says what output is needed. A representation turns the world into values a program can process. An objective gives the training process a direction. Evidence—data and evaluation—tells us whether the learned rule travels beyond the examples it saw.",
        ],
        bullets: [
          "Task: predict, rank, classify, generate, or control.",
          "Representation: the features and encoding available at decision time.",
          "Objective: the quantity optimized during training.",
          "Evidence: the tests used to support a generalization claim.",
        ],
      },
      {
        heading: "A useful baseline is a scientific control",
        paragraphs: [
          "A baseline is not an embarrassing first attempt. It reveals whether complexity adds evidence-backed value. For classification, a frequency rule or a simple linear model can expose leakage, imbalance, or an evaluation design that is too easy.",
        ],
      },
    ],
    exercise: "Write one sentence for the task, representation, objective, and evidence of a spam filter. Then list one harmful false positive and one harmful false negative.",
  },
  {
    id: "mlf-b-01",
    part: "B",
    number: "02",
    slug: "data-features-and-labels",
    title: "Data, features, and labels",
    summary: "Treat a dataset as a measurement process, not a neutral pile of rows.",
    duration: "10",
    outcome: "Trace how measurement choices shape model behavior.",
    sections: [
      {
        heading: "Rows are produced by a process",
        paragraphs: [
          "Every dataset has a collection mechanism: a sensor, form, transaction system, annotation policy, or sampling rule. The model can learn regularities introduced by that mechanism as easily as it learns the phenomenon we care about.",
          "Before modeling, document who or what can appear, who is absent, when measurements are recorded, and which transformations occur before the data reaches the table.",
        ],
      },
      {
        heading: "A feature must exist at decision time",
        paragraphs: [
          "A feature is usable only if it is available when the real prediction is made. A hospital outcome recorded after discharge may predict complications perfectly in a historical table while being impossible to use at admission. This is target leakage.",
        ],
        formula: "usable feature = available information ∩ decision time",
      },
      {
        heading: "Labels are operational definitions",
        paragraphs: [
          "A label is not the underlying truth itself; it is a recorded proxy. Fraud confirmed by investigation differs from all fraud, and customer churn defined as 30 days of inactivity differs from a person's true intention to leave.",
        ],
        bullets: [
          "Record who creates the label and with which information.",
          "Measure disagreement and missing-label patterns.",
          "Keep label policy versioned with the dataset.",
        ],
      },
    ],
    exercise: "Choose a familiar dataset. Draw the path from the real-world event to one row, then mark every place where selection, delay, or human judgment can change the value.",
  },
  {
    id: "mlf-c-01",
    part: "C",
    number: "03",
    slug: "train-validation-and-test",
    title: "Train, validation, and test",
    summary: "Separate fitting, choosing, and claiming so evaluation stays honest.",
    duration: "12",
    outcome: "Design a split that matches the future use case.",
    sections: [
      {
        heading: "Three sets answer three different questions",
        paragraphs: [
          "Training data adjusts parameters. Validation data guides choices such as features, thresholds, and hyperparameters. Test data supports the final claim after those choices are frozen.",
          "Repeatedly checking the test set turns it into validation data. The model may never read those rows directly, but the development team adapts to their results.",
        ],
      },
      {
        heading: "Random is not always representative",
        paragraphs: [
          "Random splitting assumes rows are exchangeable. Time, people, devices, locations, or duplicated records can violate that assumption. A forecasting model should usually be tested on a later period; a medical model may need patients, not visits, kept together.",
        ],
        bullets: [
          "Split by time when the future follows the past.",
          "Split by group when one entity creates many rows.",
          "Deduplicate before splitting.",
          "Fit preprocessing only on the training partition.",
        ],
      },
      {
        heading: "Cross-validation reduces dependence on one split",
        paragraphs: [
          "Cross-validation repeats the train/validation role across folds and summarizes variation. It is especially useful when data is limited, but the fold strategy must preserve the same time or group constraints as deployment.",
        ],
      },
    ],
    exercise: "For a house-price model, compare a random split, a time split, and a neighborhood-held-out split. State which future claim each one supports.",
  },
  {
    id: "mlf-d-01",
    part: "D",
    number: "04",
    slug: "metrics-and-thresholds",
    title: "Metrics and decision thresholds",
    summary: "Choose metrics from the cost of mistakes, then choose a threshold.",
    duration: "12",
    outcome: "Read a confusion matrix and explain a threshold trade-off.",
    sections: [
      {
        heading: "The confusion matrix is the accounting ledger",
        paragraphs: [
          "For a binary classifier, every prediction becomes a true positive, false positive, true negative, or false negative. Precision asks how many positive predictions were correct. Recall asks how many actual positives were found.",
        ],
        formula: "precision = TP / (TP + FP) · recall = TP / (TP + FN)",
      },
      {
        heading: "A score becomes a decision at a threshold",
        paragraphs: [
          "Many classifiers output a score, not a final action. Lowering the threshold usually catches more positives and creates more false alarms. The right operating point depends on capacity, delay, harm, and the prevalence expected in production.",
        ],
      },
      {
        heading: "One aggregate number hides subgroups",
        paragraphs: [
          "A strong overall score can coexist with failure for a region, device type, language, or rare class. Report counts and uncertainty alongside rates, and inspect slices that correspond to real operating conditions.",
        ],
        note: "Never select a metric only because it produces the largest-looking number.",
      },
    ],
    exercise: "Design a metric report for cancer screening and for spam filtering. Explain why the same precision–recall trade-off should not be used for both.",
  },
  {
    id: "mlf-e-01",
    part: "E",
    number: "05",
    slug: "bias-variance-and-overfitting",
    title: "Bias, variance, and overfitting",
    summary: "Understand the gap between fitting known examples and handling new ones.",
    duration: "10",
    outcome: "Diagnose underfitting and overfitting from learning evidence.",
    sections: [
      {
        heading: "Training error is only one side of the story",
        paragraphs: [
          "A flexible model can drive training error down by capturing stable structure, noise, or both. Generalization is evaluated on data that did not influence fitting or model selection.",
        ],
      },
      {
        heading: "Bias and variance are failure tendencies",
        paragraphs: [
          "High bias means the model or representation cannot express important structure, so both training and validation performance remain weak. High variance means results depend too strongly on the particular training sample, producing a large train–validation gap.",
        ],
        bullets: [
          "Underfitting signal: training performance is already poor.",
          "Overfitting signal: training improves while validation stalls or degrades.",
          "Data shift signal: both historical scores look healthy but production changes.",
        ],
      },
      {
        heading: "Regularization is a preference, not magic",
        paragraphs: [
          "Regularization favors simpler or more stable solutions through penalties, constrained capacity, early stopping, augmentation, or stronger priors. It helps only when that preference matches the structure of the problem.",
        ],
      },
    ],
    exercise: "Sketch learning curves for underfitting, healthy learning, and overfitting. For each curve, propose one next experiment and state what result would support your diagnosis.",
  },
  {
    id: "mlf-f-01",
    part: "F",
    number: "06",
    slug: "end-to-end-ml-workflow",
    title: "An end-to-end ML workflow",
    summary: "Connect problem framing, data, evaluation, delivery, and monitoring.",
    duration: "14",
    outcome: "Plan an ML project as a chain of testable decisions.",
    sections: [
      {
        heading: "The workflow is a loop, not a conveyor belt",
        paragraphs: [
          "Problem framing determines what data is relevant. Data inspection may reveal that the target cannot be measured. Evaluation can expose a missing slice. Production monitoring can force a new collection policy. Each stage changes earlier assumptions.",
        ],
      },
      {
        heading: "Build contracts between stages",
        paragraphs: [
          "A reliable pipeline makes expectations explicit: schemas, feature availability, label delay, model version, threshold, latency budget, and fallback behavior. These contracts turn silent drift into observable failures.",
        ],
        code: `observe → define → collect → split → train\n       ↑                         ↓\nmonitor ← deploy ← decide ← evaluate`,
      },
      {
        heading: "Monitoring starts from the original claim",
        paragraphs: [
          "Monitor input quality, feature distributions, score distributions, decision rates, latency, and delayed outcomes. A change is not automatically harmful, but it is a reason to re-check the evidence supporting the model.",
        ],
        bullets: [
          "Name an owner for every alert.",
          "Define fallback behavior before deployment.",
          "Record model, data, code, and threshold versions together.",
          "Plan how and when labels arrive for post-deployment evaluation.",
        ],
      },
    ],
    exercise: "Create a one-page system card for a delivery-time predictor: decision, user, data contract, split strategy, metric, threshold, fallback, and monitoring owner.",
  },
];

function localizeLesson(
  base: LessonDraft,
  localized: Pick<LessonDraft, "title" | "summary" | "outcome" | "sections" | "exercise">,
): LessonDraft {
  return { ...base, ...localized };
}

const lessonsVi: LessonDraft[] = [
  localizeLesson(lessonsEn[0], {
    title: "Học máy thực sự học điều gì?",
    summary: "Chuyển quan sát thành một bài toán học chính xác trước khi chọn mô hình.",
    outcome: "Phân biệt nhiệm vụ, biểu diễn, mục tiêu tối ưu và bằng chứng.",
    sections: [
      { heading: "Mô hình học một quy tắc, không học mục đích", paragraphs: ["Thuật toán học tìm các tham số làm giảm một mục tiêu có thể đo được trên những ví dụ đã quan sát. Nó không tự khám phá vì sao dự án quan trọng. Con người lựa chọn kết quả cần đạt, bằng chứng sẵn có, sai sót có thể chấp nhận và bối cảnh sử dụng.", "Vì vậy, điểm số cao chỉ cho thấy mô hình tối ưu tốt phép thử đã chọn; nó không chứng minh phép thử đại diện đúng cho quyết định thực tế."], note: "Hãy bắt đầu bằng quyết định và hậu quả của nó, không bắt đầu bằng tên mô hình." },
      { heading: "Bốn thành phần định nghĩa bài toán học", paragraphs: ["Nhiệm vụ mô tả đầu ra cần thiết. Biểu diễn biến thế giới thành giá trị máy tính xử lý được. Hàm mục tiêu định hướng quá trình huấn luyện. Dữ liệu và đánh giá cung cấp bằng chứng rằng quy tắc có thể hoạt động ngoài các ví dụ đã thấy."], bullets: ["Nhiệm vụ: dự đoán, xếp hạng, phân loại, sinh hoặc điều khiển.", "Biểu diễn: đặc trưng và cách mã hóa có mặt tại thời điểm quyết định.", "Mục tiêu: đại lượng được tối ưu khi huấn luyện.", "Bằng chứng: phép thử hỗ trợ tuyên bố về khả năng khái quát."] },
      { heading: "Đường cơ sở là một đối chứng khoa học", paragraphs: ["Đường cơ sở không phải một khởi đầu đáng xấu hổ. Nó cho biết độ phức tạp có tạo thêm giá trị được bằng chứng ủng hộ hay không. Một quy tắc theo tần suất hoặc mô hình tuyến tính đơn giản có thể phơi bày rò rỉ dữ liệu, mất cân bằng hoặc phép đánh giá quá dễ."] },
    ],
    exercise: "Viết một câu cho nhiệm vụ, biểu diễn, mục tiêu và bằng chứng của bộ lọc thư rác. Sau đó liệt kê một dương tính giả và một âm tính giả gây hại.",
  }),
  localizeLesson(lessonsEn[1], {
    title: "Dữ liệu, đặc trưng và nhãn",
    summary: "Xem tập dữ liệu như một quá trình đo lường, không phải một đống hàng trung lập.",
    outcome: "Truy vết cách lựa chọn đo lường định hình hành vi mô hình.",
    sections: [
      { heading: "Mỗi hàng được tạo ra bởi một quá trình", paragraphs: ["Mọi tập dữ liệu đều có cơ chế thu thập: cảm biến, biểu mẫu, giao dịch, chính sách gán nhãn hoặc quy tắc lấy mẫu. Mô hình có thể học các quy luật do cơ chế này tạo ra dễ như học hiện tượng ta quan tâm.", "Trước khi mô hình hóa, hãy ghi rõ ai hoặc điều gì có thể xuất hiện, ai bị thiếu, thời điểm đo và các phép biến đổi trước khi dữ liệu đến bảng."] },
      { heading: "Đặc trưng phải tồn tại tại thời điểm quyết định", paragraphs: ["Một đặc trưng chỉ sử dụng được nếu nó có sẵn khi dự đoán thực tế diễn ra. Kết quả bệnh viện ghi sau khi xuất viện có thể dự đoán biến chứng rất tốt trong dữ liệu lịch sử nhưng không thể dùng lúc nhập viện. Đó là rò rỉ mục tiêu."], formula: "đặc trưng dùng được = thông tin sẵn có ∩ thời điểm quyết định" },
      { heading: "Nhãn là một định nghĩa vận hành", paragraphs: ["Nhãn không phải bản thân sự thật nền; nó là đại diện đã được ghi lại. Gian lận được điều tra xác nhận khác với toàn bộ gian lận, và rời bỏ được định nghĩa bằng 30 ngày không hoạt động khác với ý định thật sự của khách hàng."], bullets: ["Ghi lại ai tạo nhãn và họ có thông tin gì.", "Đo bất đồng và kiểu thiếu nhãn.", "Quản lý phiên bản chính sách nhãn cùng tập dữ liệu."] },
    ],
    exercise: "Chọn một tập dữ liệu quen thuộc. Vẽ đường đi từ sự kiện ngoài đời đến một hàng dữ liệu và đánh dấu nơi việc chọn mẫu, độ trễ hoặc phán đoán con người có thể thay đổi giá trị.",
  }),
  localizeLesson(lessonsEn[2], {
    title: "Huấn luyện, thẩm định và kiểm thử",
    summary: "Tách việc khớp mô hình, lựa chọn và tuyên bố kết quả để giữ đánh giá trung thực.",
    outcome: "Thiết kế phép chia dữ liệu phù hợp với tình huống sử dụng tương lai.",
    sections: [
      { heading: "Ba tập dữ liệu trả lời ba câu hỏi", paragraphs: ["Dữ liệu huấn luyện điều chỉnh tham số. Dữ liệu thẩm định hướng dẫn lựa chọn đặc trưng, ngưỡng và siêu tham số. Dữ liệu kiểm thử hỗ trợ tuyên bố cuối cùng sau khi các lựa chọn đã được khóa.", "Kiểm tra tập test nhiều lần sẽ biến nó thành tập validation. Mô hình có thể không trực tiếp đọc các hàng đó, nhưng nhóm phát triển đã thích nghi theo kết quả của chúng."] },
      { heading: "Ngẫu nhiên không phải lúc nào cũng đại diện", paragraphs: ["Chia ngẫu nhiên giả định các hàng có thể hoán đổi. Thời gian, con người, thiết bị, địa điểm hoặc bản ghi trùng lặp có thể phá vỡ giả định này. Mô hình dự báo thường cần kiểm thử ở giai đoạn sau; mô hình y tế cần giữ các lần khám của cùng bệnh nhân trong một phía."], bullets: ["Chia theo thời gian khi tương lai đi sau quá khứ.", "Chia theo nhóm khi một thực thể tạo nhiều hàng.", "Khử trùng lặp trước khi chia.", "Chỉ khớp bước tiền xử lý trên tập huấn luyện."] },
      { heading: "Kiểm định chéo giảm phụ thuộc vào một phép chia", paragraphs: ["Kiểm định chéo luân phiên vai trò huấn luyện và thẩm định qua nhiều fold rồi tổng hợp độ biến thiên. Nó hữu ích khi dữ liệu hạn chế, nhưng chiến lược fold vẫn phải bảo toàn ràng buộc thời gian hoặc nhóm của môi trường triển khai."] },
    ],
    exercise: "Với mô hình giá nhà, hãy so sánh chia ngẫu nhiên, chia theo thời gian và giữ riêng một khu phố. Nêu rõ mỗi phép chia hỗ trợ tuyên bố tương lai nào.",
  }),
  localizeLesson(lessonsEn[3], {
    title: "Chỉ số và ngưỡng quyết định",
    summary: "Chọn chỉ số từ chi phí của sai lầm, sau đó mới chọn ngưỡng.",
    outcome: "Đọc ma trận nhầm lẫn và giải thích đánh đổi của ngưỡng.",
    sections: [
      { heading: "Ma trận nhầm lẫn là sổ kế toán", paragraphs: ["Với bộ phân loại nhị phân, mỗi dự đoán thuộc một trong bốn ô: dương tính thật, dương tính giả, âm tính thật hoặc âm tính giả. Precision hỏi bao nhiêu dự đoán dương là đúng; recall hỏi bao nhiêu trường hợp dương thật đã được tìm thấy."], formula: "precision = TP / (TP + FP) · recall = TP / (TP + FN)" },
      { heading: "Điểm số trở thành quyết định tại một ngưỡng", paragraphs: ["Nhiều bộ phân loại trả về điểm chứ chưa phải hành động cuối. Hạ ngưỡng thường bắt được nhiều trường hợp dương hơn nhưng tạo thêm cảnh báo giả. Điểm vận hành phù hợp phụ thuộc năng lực xử lý, độ trễ, mức thiệt hại và tỷ lệ dương trong sản xuất."] },
      { heading: "Một con số tổng hợp che giấu các nhóm", paragraphs: ["Điểm tổng thể tốt vẫn có thể đi cùng thất bại ở một vùng, loại thiết bị, ngôn ngữ hoặc lớp hiếm. Hãy báo cáo số lượng và độ bất định cùng các tỷ lệ, đồng thời kiểm tra những lát dữ liệu phản ánh điều kiện vận hành."], note: "Đừng chọn chỉ số chỉ vì nó tạo ra con số trông lớn nhất." },
    ],
    exercise: "Thiết kế báo cáo chỉ số cho sàng lọc ung thư và lọc thư rác. Giải thích vì sao hai bài toán không nên dùng cùng một đánh đổi precision–recall.",
  }),
  localizeLesson(lessonsEn[4], {
    title: "Độ chệch, phương sai và quá khớp",
    summary: "Hiểu khoảng cách giữa việc khớp các ví dụ đã biết và xử lý dữ liệu mới.",
    outcome: "Chẩn đoán thiếu khớp và quá khớp từ bằng chứng học tập.",
    sections: [
      { heading: "Lỗi huấn luyện chỉ là một nửa câu chuyện", paragraphs: ["Mô hình linh hoạt có thể giảm lỗi huấn luyện bằng cách nắm bắt cấu trúc ổn định, nhiễu hoặc cả hai. Khả năng khái quát phải được đánh giá trên dữ liệu không ảnh hưởng đến việc khớp hay lựa chọn mô hình."] },
      { heading: "Độ chệch và phương sai là xu hướng thất bại", paragraphs: ["Độ chệch cao nghĩa là mô hình hoặc biểu diễn không thể diễn đạt cấu trúc quan trọng, nên cả huấn luyện và thẩm định đều yếu. Phương sai cao nghĩa là kết quả phụ thuộc quá mạnh vào mẫu huấn luyện, tạo khoảng cách lớn giữa train và validation."], bullets: ["Dấu hiệu thiếu khớp: kết quả trên tập huấn luyện đã kém.", "Dấu hiệu quá khớp: train tiếp tục tốt lên khi validation đứng yên hoặc xấu đi.", "Dấu hiệu dịch chuyển: điểm lịch sử tốt nhưng môi trường sản xuất thay đổi."] },
      { heading: "Điều chuẩn là một ưu tiên, không phải phép màu", paragraphs: ["Điều chuẩn ưu tiên lời giải đơn giản hoặc ổn định hơn thông qua hình phạt, giới hạn năng lực, dừng sớm, tăng cường dữ liệu hoặc tiên nghiệm mạnh hơn. Nó chỉ hữu ích khi ưu tiên đó phù hợp với cấu trúc bài toán."] },
    ],
    exercise: "Phác thảo đường cong học cho thiếu khớp, học lành mạnh và quá khớp. Với mỗi đường, đề xuất một thí nghiệm tiếp theo và kết quả nào sẽ ủng hộ chẩn đoán.",
  }),
  localizeLesson(lessonsEn[5], {
    title: "Quy trình học máy đầu cuối",
    summary: "Kết nối định hình bài toán, dữ liệu, đánh giá, triển khai và giám sát.",
    outcome: "Lập kế hoạch dự án học máy như một chuỗi quyết định có thể kiểm chứng.",
    sections: [
      { heading: "Quy trình là một vòng lặp, không phải băng chuyền", paragraphs: ["Định hình bài toán quyết định dữ liệu liên quan. Kiểm tra dữ liệu có thể cho thấy mục tiêu không đo được. Đánh giá có thể phơi bày một lát dữ liệu bị thiếu. Giám sát sản xuất có thể buộc ta thay đổi chính sách thu thập. Mỗi giai đoạn đều có thể sửa lại giả định trước đó."] },
      { heading: "Tạo hợp đồng giữa các giai đoạn", paragraphs: ["Pipeline đáng tin cậy làm rõ kỳ vọng: schema, thời điểm có đặc trưng, độ trễ nhãn, phiên bản mô hình, ngưỡng, ngân sách độ trễ và hành vi dự phòng. Những hợp đồng này biến dịch chuyển âm thầm thành lỗi có thể quan sát."], code: "quan sát → định nghĩa → thu thập → chia → huấn luyện\n    ↑                                      ↓\ngiám sát ← triển khai ← quyết định ← đánh giá" },
      { heading: "Giám sát bắt đầu từ tuyên bố ban đầu", paragraphs: ["Hãy theo dõi chất lượng đầu vào, phân phối đặc trưng và điểm số, tỷ lệ quyết định, độ trễ và kết quả đến muộn. Thay đổi không tự động đồng nghĩa với có hại, nhưng là lý do để kiểm tra lại bằng chứng hỗ trợ mô hình."], bullets: ["Chỉ định người chịu trách nhiệm cho mỗi cảnh báo.", "Định nghĩa hành vi dự phòng trước khi triển khai.", "Ghi cùng nhau phiên bản mô hình, dữ liệu, mã và ngưỡng.", "Lập kế hoạch thời điểm nhãn xuất hiện để đánh giá sau triển khai."] },
    ],
    exercise: "Tạo thẻ hệ thống một trang cho mô hình dự đoán thời gian giao hàng: quyết định, người dùng, hợp đồng dữ liệu, cách chia, chỉ số, ngưỡng, dự phòng và người giám sát.",
  }),
];

const lessonsKo: LessonDraft[] = [
  localizeLesson(lessonsEn[0], {
    title: "머신러닝은 실제로 무엇을 학습하는가",
    summary: "모델을 고르기 전에 관측을 명확한 학습 문제로 바꿉니다.",
    outcome: "과제, 표현, 목적함수, 증거를 구분할 수 있습니다.",
    sections: [
      { heading: "모델은 목적이 아니라 규칙을 학습합니다", paragraphs: ["학습 알고리즘은 관측된 예제에서 측정 가능한 목적함수를 줄이는 매개변수를 찾습니다. 프로젝트가 왜 중요한지는 스스로 알아내지 못합니다. 사람은 필요한 결과, 이용 가능한 증거, 허용할 오류, 사용 조건을 정합니다.", "따라서 높은 점수는 선택한 시험을 잘 최적화했다는 증거일 뿐, 그 시험이 실제 결정을 올바르게 대표한다는 증거는 아닙니다."], note: "모델 이름보다 결정과 그 결과에서 프로젝트를 시작하세요." },
      { heading: "네 가지 요소가 학습 문제를 정의합니다", paragraphs: ["과제는 필요한 출력을 설명합니다. 표현은 현실을 프로그램이 처리할 값으로 바꿉니다. 목적함수는 학습의 방향을 정합니다. 데이터와 평가는 학습한 규칙이 본 적 없는 사례에도 적용되는지 보여 주는 증거입니다."], bullets: ["과제: 예측, 순위화, 분류, 생성 또는 제어.", "표현: 결정 시점에 사용할 수 있는 특징과 인코딩.", "목적함수: 학습 중 최적화하는 양.", "증거: 일반화 주장을 뒷받침하는 시험."] },
      { heading: "베이스라인은 과학적 대조군입니다", paragraphs: ["베이스라인은 부끄러운 첫 시도가 아닙니다. 복잡성이 실제로 증거 기반 가치를 더하는지 알려 줍니다. 빈도 규칙이나 단순한 선형 모델만으로도 누수, 불균형, 지나치게 쉬운 평가 설계를 발견할 수 있습니다."] },
    ],
    exercise: "스팸 필터의 과제, 표현, 목적함수, 증거를 각각 한 문장으로 쓰고, 해로운 거짓 양성과 거짓 음성을 하나씩 적어 보세요.",
  }),
  localizeLesson(lessonsEn[1], {
    title: "데이터, 특징, 레이블",
    summary: "데이터셋을 중립적인 행의 집합이 아니라 측정 과정으로 봅니다.",
    outcome: "측정 선택이 모델 행동을 만드는 과정을 추적할 수 있습니다.",
    sections: [
      { heading: "모든 행은 어떤 과정을 통해 만들어집니다", paragraphs: ["데이터셋에는 센서, 양식, 거래 시스템, 주석 정책, 표본 규칙 같은 수집 메커니즘이 있습니다. 모델은 관심 현상만큼이나 그 메커니즘이 만든 규칙도 쉽게 학습합니다.", "모델링 전에 누가 포함되고 빠지는지, 언제 측정되는지, 테이블에 도달하기 전 어떤 변환을 거치는지 기록하세요."] },
      { heading: "특징은 결정 시점에 존재해야 합니다", paragraphs: ["특징은 실제 예측이 이루어질 때 사용할 수 있어야 합니다. 퇴원 뒤 기록된 병원 결과는 과거 테이블에서 합병증을 완벽히 예측해도 입원 시점에는 사용할 수 없습니다. 이것이 타깃 누수입니다."], formula: "사용 가능한 특징 = 이용 가능한 정보 ∩ 결정 시점" },
      { heading: "레이블은 조작적 정의입니다", paragraphs: ["레이블은 근본적인 진실 자체가 아니라 기록된 대리값입니다. 조사로 확인된 사기는 전체 사기와 다르고, 30일 비활동으로 정의한 이탈은 고객의 실제 의도와 다릅니다."], bullets: ["누가 어떤 정보로 레이블을 만드는지 기록합니다.", "불일치와 누락 패턴을 측정합니다.", "레이블 정책을 데이터셋과 함께 버전 관리합니다."] },
    ],
    exercise: "익숙한 데이터셋 하나를 골라 현실의 사건이 한 행이 되는 경로를 그리세요. 선택, 지연, 사람의 판단이 값을 바꿀 수 있는 지점을 표시하세요.",
  }),
  localizeLesson(lessonsEn[2], {
    title: "학습, 검증, 테스트",
    summary: "적합, 선택, 최종 주장을 분리해 평가의 정직성을 지킵니다.",
    outcome: "미래 사용 조건에 맞는 분할을 설계할 수 있습니다.",
    sections: [
      { heading: "세 데이터셋은 서로 다른 질문에 답합니다", paragraphs: ["학습 데이터는 매개변수를 조정합니다. 검증 데이터는 특징, 임곗값, 하이퍼파라미터 선택을 돕습니다. 테스트 데이터는 모든 선택을 고정한 뒤 최종 주장을 뒷받침합니다.", "테스트셋을 반복해서 확인하면 결국 검증셋이 됩니다. 모델이 행을 직접 읽지 않아도 개발팀이 결과에 맞춰 바뀌기 때문입니다."] },
      { heading: "무작위 분할이 언제나 대표적이지는 않습니다", paragraphs: ["무작위 분할은 행을 서로 바꿔도 된다고 가정합니다. 시간, 사람, 기기, 장소, 중복 기록은 이 가정을 깨뜨립니다. 예측 모델은 보통 더 나중 기간에서 시험해야 하며, 의료 모델은 방문이 아니라 환자 단위로 묶어야 합니다."], bullets: ["미래가 과거 뒤에 올 때는 시간으로 나눕니다.", "한 개체가 여러 행을 만들면 그룹으로 나눕니다.", "분할 전에 중복을 제거합니다.", "전처리는 학습 파티션에만 적합합니다."] },
      { heading: "교차 검증은 한 번의 분할 의존성을 줄입니다", paragraphs: ["교차 검증은 여러 폴드에서 학습과 검증 역할을 반복하고 변동을 요약합니다. 데이터가 적을 때 유용하지만, 폴드 전략도 배포 환경의 시간과 그룹 제약을 유지해야 합니다."] },
    ],
    exercise: "주택 가격 모델에서 무작위, 시간, 지역 홀드아웃 분할을 비교하고 각 방식이 어떤 미래 주장을 지지하는지 적어 보세요.",
  }),
  localizeLesson(lessonsEn[3], {
    title: "평가 지표와 결정 임곗값",
    summary: "실수의 비용에서 지표를 고른 다음 임곗값을 선택합니다.",
    outcome: "혼동 행렬을 읽고 임곗값의 절충을 설명할 수 있습니다.",
    sections: [
      { heading: "혼동 행렬은 예측의 회계 장부입니다", paragraphs: ["이진 분류의 모든 예측은 참 양성, 거짓 양성, 참 음성, 거짓 음성 중 하나가 됩니다. 정밀도는 양성 예측 중 맞은 비율을, 재현율은 실제 양성 중 찾아낸 비율을 묻습니다."], formula: "precision = TP / (TP + FP) · recall = TP / (TP + FN)" },
      { heading: "점수는 임곗값에서 결정이 됩니다", paragraphs: ["많은 분류기는 최종 행동이 아니라 점수를 출력합니다. 임곗값을 낮추면 보통 양성을 더 많이 찾는 대신 오경보가 늘어납니다. 올바른 운영 지점은 처리 용량, 지연, 피해, 실제 양성 비율에 따라 달라집니다."] },
      { heading: "하나의 평균값은 하위 집단을 숨깁니다", paragraphs: ["전체 점수가 좋아도 특정 지역, 기기, 언어, 희귀 클래스에서 실패할 수 있습니다. 비율과 함께 건수와 불확실성을 보고하고 실제 운영 조건에 해당하는 슬라이스를 살펴보세요."], note: "가장 커 보이는 숫자를 만든다는 이유만으로 지표를 선택하지 마세요." },
    ],
    exercise: "암 검진과 스팸 필터의 지표 보고서를 각각 설계하고, 두 문제에 같은 정밀도–재현율 절충을 쓰면 안 되는 이유를 설명하세요.",
  }),
  localizeLesson(lessonsEn[4], {
    title: "편향, 분산, 과적합",
    summary: "이미 본 예제를 맞히는 것과 새로운 사례를 처리하는 것의 차이를 이해합니다.",
    outcome: "학습 증거로 과소적합과 과적합을 진단할 수 있습니다.",
    sections: [
      { heading: "학습 오차는 이야기의 절반뿐입니다", paragraphs: ["유연한 모델은 안정적인 구조와 잡음 중 하나 또는 둘 다를 포착해 학습 오차를 낮출 수 있습니다. 일반화는 적합이나 모델 선택에 영향을 주지 않은 데이터에서 평가해야 합니다."] },
      { heading: "편향과 분산은 실패 경향입니다", paragraphs: ["높은 편향은 모델이나 표현이 중요한 구조를 담지 못해 학습과 검증 성능이 모두 약한 상태입니다. 높은 분산은 결과가 특정 학습 표본에 지나치게 의존해 학습–검증 간극이 커지는 상태입니다."], bullets: ["과소적합 신호: 학습 성능부터 낮습니다.", "과적합 신호: 학습은 좋아지지만 검증은 멈추거나 나빠집니다.", "분포 이동 신호: 과거 점수는 좋지만 운영 환경이 달라집니다."] },
      { heading: "정규화는 마법이 아니라 선호입니다", paragraphs: ["정규화는 패널티, 용량 제한, 조기 종료, 증강, 강한 사전분포를 통해 더 단순하고 안정적인 해를 선호합니다. 그 선호가 문제 구조와 맞을 때만 도움이 됩니다."] },
    ],
    exercise: "과소적합, 건강한 학습, 과적합의 학습 곡선을 그리고 각각 다음 실험과 진단을 지지할 결과를 적어 보세요.",
  }),
  localizeLesson(lessonsEn[5], {
    title: "엔드투엔드 머신러닝 워크플로",
    summary: "문제 정의, 데이터, 평가, 전달, 모니터링을 연결합니다.",
    outcome: "검증 가능한 결정의 사슬로 머신러닝 프로젝트를 계획할 수 있습니다.",
    sections: [
      { heading: "워크플로는 컨베이어 벨트가 아니라 순환 고리입니다", paragraphs: ["문제 정의는 관련 데이터를 결정합니다. 데이터 점검은 타깃을 측정할 수 없다는 사실을 드러낼 수 있습니다. 평가는 빠진 슬라이스를 찾고, 운영 모니터링은 수집 정책을 바꾸게 할 수 있습니다. 모든 단계가 앞선 가정을 수정합니다."] },
      { heading: "단계 사이에 계약을 만드세요", paragraphs: ["신뢰할 수 있는 파이프라인은 스키마, 특징 이용 시점, 레이블 지연, 모델 버전, 임곗값, 지연 예산, 대체 행동을 명시합니다. 이런 계약은 조용한 변화를 관측 가능한 실패로 바꿉니다."], code: "관측 → 정의 → 수집 → 분할 → 학습\n ↑                           ↓\n모니터링 ← 배포 ← 결정 ← 평가" },
      { heading: "모니터링은 최초의 주장으로 돌아갑니다", paragraphs: ["입력 품질, 특징과 점수 분포, 결정 비율, 지연, 늦게 도착하는 결과를 모니터링하세요. 변화가 언제나 해롭지는 않지만 모델을 지지한 증거를 다시 확인해야 할 이유는 됩니다."], bullets: ["모든 경보에 담당자를 지정합니다.", "배포 전에 대체 행동을 정의합니다.", "모델·데이터·코드·임곗값 버전을 함께 기록합니다.", "배포 후 평가를 위해 레이블 도착 시점을 계획합니다."] },
    ],
    exercise: "배송 시간 예측기의 한 페이지 시스템 카드를 만드세요. 결정, 사용자, 데이터 계약, 분할, 지표, 임곗값, 대체 행동, 모니터링 담당자를 포함하세요.",
  }),
];

const pilotLessons: Record<Language, LessonDraft[]> = {
  en: lessonsEn,
  vi: lessonsVi,
  ko: lessonsKo,
};

function generatedLesson(language: Language, seed: (typeof curriculumSeeds)[number]): Lesson {
  const title = seed.titles[language];
  const concepts = seed.tags.join(", ");
  const number = String(seed.order).padStart(3, "0");
  const duration = seed.kind === "code" || seed.kind === "exercise"
    ? "16"
    : seed.kind === "algorithm"
      ? "14"
      : seed.kind === "overview"
        ? "12"
        : "11";
  const topicDepth = getTopicDepth(seed);
  const learningProfile = getLearningProfile(seed);
  const core = topicDepth?.core[language];
  const example = topicDepth?.example[language];
  const mechanism = learningProfile.mechanism[language];
  const caution = learningProfile.caution[language];
  const steps = learningProfile.steps[language];
  const code = getTopicCode(seed.slug);

  const copy = {
    en: {
      core: "Core idea",
      mechanism: "How it works",
      review: "Worked example and failure check",
      summary: `A focused lesson on ${title}: understand the central idea, trace the mechanism, work through an example, and test where it fails.`,
      fallback: `Learn the central operation behind ${title} and connect ${concepts} to a testable result.`,
      fallbackExample: `Construct the smallest possible ${title} example and record every input, operation, and output.`,
      outcome: `Explain ${title}, reproduce its central operation, and diagnose one important failure mode.`,
      finalCheck: `A credible check for ${title} compares the worked result with a simple baseline, changes one assumption, and records the evidence that would reverse the conclusion.`,
      exercise: () => `Recreate the ${title} worked example with your own small data. Change one assumption, calculate or inspect the new result, and explain why it moved.`,
    },
    vi: {
      core: "Ý tưởng cốt lõi",
      mechanism: "Cơ chế hoạt động",
      review: "Ví dụ có lời giải và kiểm tra thất bại",
      summary: `Bài học chuyên biệt về ${title}: hiểu ý tưởng cốt lõi, lần theo cơ chế, làm một ví dụ và kiểm tra nơi phương pháp thất bại.`,
      fallback: `Học thao tác trung tâm của ${title} và nối ${concepts} với một kết quả có thể kiểm tra.`,
      fallbackExample: `Tạo ví dụ nhỏ nhất có thể cho ${title} và ghi lại mọi đầu vào, thao tác cùng đầu ra.`,
      outcome: `Giải thích ${title}, tái hiện thao tác trung tâm và chẩn đoán một kiểu thất bại quan trọng.`,
      finalCheck: `Phép kiểm tra đáng tin cho ${title} phải so kết quả ví dụ với baseline đơn giản, thay đổi một giả định và ghi bằng chứng có thể đảo ngược kết luận.`,
      exercise: () => `Hãy dựng lại ví dụ ${title} bằng dữ liệu nhỏ của bạn. Thay đổi một giả định, tính hoặc quan sát kết quả mới rồi giải thích vì sao nó thay đổi.`,
    },
    ko: {
      core: "핵심 개념",
      mechanism: "작동 원리",
      review: "풀이 예제와 실패 점검",
      summary: `${title} 집중 레슨: 핵심 개념을 이해하고 작동 원리를 따라가며 예제를 풀고 실패 지점을 점검합니다.`,
      fallback: `${title}의 핵심 연산을 배우고 ${concepts}을 검증 가능한 결과와 연결합니다.`,
      fallbackExample: `${title}의 가장 작은 예제를 만들고 모든 입력, 연산, 출력을 기록합니다.`,
      outcome: `${title}을 설명하고 핵심 연산을 재현하며 중요한 실패 유형 하나를 진단할 수 있습니다.`,
      finalCheck: `${title}의 신뢰할 수 있는 검사는 예제 결과를 단순 기준선과 비교하고 가정 하나를 바꾸며 결론을 뒤집을 근거를 기록합니다.`,
      exercise: () => `작은 데이터로 ${title} 풀이 예제를 다시 만드세요. 가정 하나를 바꾸고 새 결과를 계산하거나 관찰한 뒤 왜 달라졌는지 설명하세요.`,
    },
  }[language];
  const coreParagraph = core ?? copy.fallback;
  const workedExample = example ?? copy.fallbackExample;

  return {
    id: seed.id,
    sourcePageId: seed.sourcePageId,
    collection: seed.collection,
    kind: seed.kind,
    tags: seed.tags,
    featured: seed.featured ?? false,
    part: seed.part,
    number,
    slug: seed.slug,
    title,
    summary: copy.summary,
    duration,
    outcome: copy.outcome,
    sections: [
      {
        heading: copy.core,
        paragraphs: [coreParagraph],
      },
      {
        heading: copy.mechanism,
        paragraphs: [mechanism],
        bullets: steps,
        code,
      },
      {
        heading: copy.review,
        paragraphs: [workedExample, caution, copy.finalCheck],
      },
    ],
    exercise: copy.exercise(),
  };
}

function mergePilot(language: Language, seed: (typeof curriculumSeeds)[number], generated: Lesson): Lesson {
  const pilot = pilotLessons[language].find((item) => item.slug === seed.slug);
  if (!pilot) return generated;
  return {
    ...pilot,
    id: seed.id,
    sourcePageId: seed.sourcePageId,
    collection: seed.collection,
    kind: seed.kind,
    tags: seed.tags,
    featured: true,
    part: seed.part,
    number: String(seed.order).padStart(3, "0"),
  };
}

const formulaSectionHeadings: Record<Language, string> = {
  en: "Mathematical anchor",
  vi: "Mốc toán học",
  ko: "수학적 기준점",
};

const formulaFlowHeadings: Record<Language, string> = {
  en: "Mathematical solution flow",
  vi: "Luồng giải bằng toán học",
  ko: "수학적 해결 흐름",
};

const formulaFlowIntroductions: Record<Language, string> = {
  en: "Read this derivation in order. Each equation defines its components, then explains why the next equation is needed.",
  vi: "Hãy đọc phép suy dẫn theo thứ tự. Mỗi công thức giải thích các thành phần, rồi nêu lý do cần công thức tiếp theo.",
  ko: "이 유도 과정을 순서대로 읽으세요. 각 식은 구성요소를 설명한 뒤 다음 식이 필요한 이유를 밝힙니다.",
};

const formulaStepLabel = (language: Language, index: number, isResult: boolean): string => {
  const number = index + 1;
  if (language === "vi") return `${isResult ? "Kết quả" : "Bước"} ${number}`;
  if (language === "ko") return `${number}단계${isResult ? " · 결론" : ""}`;
  return `${isResult ? "Result" : "Step"} ${number}`;
};

const formulaTransition = (language: Language, nextExplanation: string): string => {
  if (language === "vi") return `Kết quả của bước này là đầu vào cần thiết cho bước kế tiếp: ${nextExplanation}`;
  if (language === "ko") return `이 단계의 결과가 다음 단계에 필요한 입력이 됩니다. ${nextExplanation}`;
  return `The result of this step is the input needed next: ${nextExplanation}`;
};

function enrichLesson(
  language: Language,
  seed: (typeof curriculumSeeds)[number],
  lesson: Lesson,
): Lesson {
  const support = formulaSupportBySlug[seed.slug];
  const alreadyHasFormula = lesson.sections.some((section) => section.formula);
  const hasFlow = Boolean(support?.steps?.length);
  const flowSteps = support && hasFlow
    ? [
        ...support.steps!,
        {
          stage: "compute" as const,
          expression: support.expression,
          explanation: support.explanation,
          components: support.variables,
        },
      ]
    : undefined;
  const sections =
    support && (!alreadyHasFormula || hasFlow)
      ? [
          ...lesson.sections,
          {
            heading: hasFlow ? formulaFlowHeadings[language] : formulaSectionHeadings[language],
            paragraphs: [hasFlow ? formulaFlowIntroductions[language] : support.explanation[language]],
            formula: support.expression,
            formulaVariables: support.variables,
            formulaSteps: flowSteps?.map((formulaStep, index) => ({
              label: formulaStepLabel(language, index, index === flowSteps.length - 1),
              expression: formulaStep.expression,
              explanation: formulaStep.explanation[language],
              components: formulaStep.components ?? [],
              nextReason: flowSteps[index + 1]
                ? formulaTransition(language, flowSteps[index + 1].explanation[language])
                : undefined,
              isResult: index === flowSteps.length - 1,
            })),
          },
        ]
      : lesson.sections;

  return {
    ...lesson,
    englishTitle: seed.titles.en,
    terminology: localizedTerminology(language, seed),
    sections,
  };
}

export const lessons: Record<Language, Lesson[]> = {
  en: curriculumSeeds.map((seed) =>
    enrichLesson("en", seed, mergePilot("en", seed, generatedLesson("en", seed))),
  ),
  vi: curriculumSeeds.map((seed) =>
    enrichLesson("vi", seed, mergePilot("vi", seed, generatedLesson("vi", seed))),
  ),
  ko: curriculumSeeds.map((seed) =>
    enrichLesson("ko", seed, mergePilot("ko", seed, generatedLesson("ko", seed))),
  ),
};

type LessonShape = {
  sections: Array<{
    paragraphs: number;
    bullets: number;
    formula: boolean;
    formulaVariables: number;
    formulaSteps: number;
    code: boolean;
    note: boolean;
  }>;
  terminology: number;
};

function lessonShape(lesson: Lesson): LessonShape {
  return {
    sections: lesson.sections.map((section) => ({
      paragraphs: section.paragraphs.length,
      bullets: section.bullets?.length ?? 0,
      formula: Boolean(section.formula),
      formulaVariables: section.formulaVariables?.length ?? 0,
      formulaSteps: section.formulaSteps?.length ?? 0,
      code: Boolean(section.code),
      note: Boolean(section.note),
    })),
    terminology: lesson.terminology?.length ?? 0,
  };
}

export const lessonParityIssues = curriculumSeeds.flatMap((seed) => {
  const localized = languages.map((language) =>
    lessons[language].find((lesson) => lesson.slug === seed.slug),
  );
  if (localized.some((lesson) => !lesson)) {
    return [`${seed.slug}: missing localized lesson record`];
  }

  const [english, vietnamese, korean] = localized as [Lesson, Lesson, Lesson];
  const expected = JSON.stringify(lessonShape(vietnamese));
  const issues: string[] = [];
  for (const [language, lesson] of [
    ["en", english],
    ["ko", korean],
  ] as const) {
    if (JSON.stringify(lessonShape(lesson)) !== expected) {
      issues.push(`${seed.slug}: ${language} content shape differs from vi`);
    }
    for (const field of ["title", "summary", "outcome", "exercise"] as const) {
      if (!lesson[field].trim()) issues.push(`${seed.slug}: ${language} missing ${field}`);
    }
    lesson.sections.forEach((section, index) => {
      if (!section.heading.trim()) {
        issues.push(`${seed.slug}: ${language} section ${index + 1} missing heading`);
      }
      if (section.paragraphs.some((paragraph) => !paragraph.trim())) {
        issues.push(`${seed.slug}: ${language} section ${index + 1} has an empty paragraph`);
      }
    });
  }
  return issues;
});

if (lessonParityIssues.length > 0) {
  throw new Error(`Localized lesson parity failed:\n${lessonParityIssues.join("\n")}`);
}

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}

export function getLesson(language: Language, slug: string) {
  return lessons[language].find((lesson) => lesson.slug === slug);
}

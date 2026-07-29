export type CourseLanguage = "en" | "vi" | "ko";

export const guidedSlugs = [
  "what-machine-learning-learns",
  "data-features-and-labels",
  "train-validation-and-test",
  "metrics-and-thresholds",
  "bias-variance-and-overfitting",
  "end-to-end-ml-workflow",
] as const;

export type GuidedSlug = (typeof guidedSlugs)[number];

export type ReferenceId =
  | "microsoft-ml-for-beginners"
  | "google-ml-crash-course"
  | "dive-into-deep-learning"
  | "scikit-learn"
  | "statistical-learning"
  | "google-problem-framing"
  | "google-production-monitoring"
  | "sklearn-time-series-split"
  | "sklearn-threshold-tuning"
  | "sklearn-calibration"
  | "sklearn-learning-curves"
  | "nist-ai-rmf"
  | "nist-evaluation-2026"
  | "nist-monitoring-2026"
  | "stanford-ai-index-2026"
  | "wikidocs-index";

export type ReferenceSource = {
  id: ReferenceId;
  title: string;
  url: string;
  license: string;
  use: Record<CourseLanguage, string>;
};

export const referenceSources: ReferenceSource[] = [
  {
    id: "microsoft-ml-for-beginners",
    title: "Microsoft · Machine Learning for Beginners",
    url: "https://github.com/microsoft/ML-For-Beginners",
    license: "MIT",
    use: {
      en: "Reference for project-based pacing, frequent knowledge checks, and assignments. No text or artwork is copied.",
      vi: "Tham khảo nhịp học theo dự án, kiểm tra kiến thức thường xuyên và bài tập. Không sao chép văn bản hoặc hình ảnh.",
      ko: "프로젝트 중심 학습 흐름, 잦은 지식 점검, 과제 구성을 참고합니다. 본문이나 그림은 복제하지 않습니다.",
    },
  },
  {
    id: "google-ml-crash-course",
    title: "Google · Machine Learning Crash Course",
    url: "https://developers.google.com/machine-learning/crash-course",
    license: "CC BY 4.0 content · Apache 2.0 code",
    use: {
      en: "Reference for short concept modules, interactive intuition, and the path from models to real-world systems. Google media is not reused.",
      vi: "Tham khảo mô-đun khái niệm ngắn, trực giác tương tác và lộ trình từ mô hình đến hệ thống thực tế. Không tái sử dụng media của Google.",
      ko: "짧은 개념 모듈, 상호작용 기반 직관, 모델에서 실제 시스템으로 이어지는 흐름을 참고합니다. Google 미디어는 재사용하지 않습니다.",
    },
  },
  {
    id: "dive-into-deep-learning",
    title: "Dive into Deep Learning",
    url: "https://d2l.ai/",
    license: "CC BY-SA 4.0 text · modified MIT sample code",
    use: {
      en: "Reference for placing explanation, mathematics, and runnable code together. Passages, figures, and code are not adapted in this release.",
      vi: "Tham khảo cách đặt giải thích, toán học và mã chạy được trong cùng một mạch. Bản phát hành này không chuyển thể đoạn văn, hình hoặc mã.",
      ko: "설명·수학·실행 가능한 코드를 한 흐름에 배치하는 방식을 참고합니다. 이번 릴리스는 문장, 그림, 코드를 각색하지 않습니다.",
    },
  },
  {
    id: "scikit-learn",
    title: "scikit-learn User Guide",
    url: "https://scikit-learn.org/stable/user_guide.html",
    license: "BSD-3-Clause",
    use: {
      en: "Technical reference for model selection, evaluation, preprocessing, pipelines, and implementation behavior.",
      vi: "Tài liệu kỹ thuật cho chọn mô hình, đánh giá, tiền xử lý, pipeline và hành vi triển khai.",
      ko: "모델 선택, 평가, 전처리, 파이프라인, 구현 동작을 확인하는 기술 참고 자료입니다.",
    },
  },
  {
    id: "statistical-learning",
    title: "An Introduction to Statistical Learning",
    url: "https://www.statlearning.com/",
    license: "All rights reserved",
    use: {
      en: "Reading recommendation for its accessible sequence and end-of-chapter labs only. Nothing is copied, translated, or adapted.",
      vi: "Chỉ được đề xuất đọc vì trình tự dễ tiếp cận và lab cuối chương. Không sao chép, dịch hoặc chuyển thể nội dung.",
      ko: "접근하기 쉬운 순서와 장말 실습을 위한 읽기 자료로만 추천합니다. 어떤 내용도 복제·번역·각색하지 않습니다.",
    },
  },
  {
    id: "google-problem-framing",
    title: "Google · Framing an ML problem",
    url: "https://developers.google.com/machine-learning/problem-framing/ml-framing",
    license: "CC BY 4.0 content · Apache 2.0 code",
    use: {
      en: "Current reference for separating ideal outcomes, model goals, outputs, proxy labels, and success metrics. No wording or figures are copied.",
      vi: "Tài liệu hiện hành để tách ideal outcome, mục tiêu mô hình, output, proxy label và success metric. Không sao chép câu chữ hoặc hình.",
      ko: "이상적 결과, 모델 목표, 출력, 대리 레이블, 성공 지표를 분리하는 최신 참고 자료입니다. 문장이나 그림은 복제하지 않습니다.",
    },
  },
  {
    id: "google-production-monitoring",
    title: "Google · Monitoring ML pipelines",
    url: "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring",
    license: "CC BY 4.0 content · Apache 2.0 code",
    use: {
      en: "Current reference for data schemas, feature checks, slices, training-serving skew, real-world metrics, and live quality monitoring.",
      vi: "Tài liệu hiện hành về schema dữ liệu, kiểm tra feature, slice, training-serving skew, chỉ số thực tế và giám sát chất lượng live.",
      ko: "데이터 스키마, 특징 검사, 슬라이스, 학습-서빙 왜곡, 현실 지표, 운영 품질 모니터링을 위한 최신 참고 자료입니다.",
    },
  },
  {
    id: "sklearn-time-series-split",
    title: "scikit-learn · TimeSeriesSplit",
    url: "https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html",
    license: "BSD-3-Clause",
    use: {
      en: "API reference for evaluating time-ordered data without training on the future and testing on the past.",
      vi: "Tài liệu API để đánh giá dữ liệu theo thời gian mà không train bằng tương lai rồi test trên quá khứ.",
      ko: "미래 데이터로 학습하고 과거를 평가하는 오류를 피하는 시계열 분할 API 참고 자료입니다.",
    },
  },
  {
    id: "sklearn-threshold-tuning",
    title: "scikit-learn · Decision-threshold tuning",
    url: "https://scikit-learn.org/stable/auto_examples/model_selection/plot_tuned_decision_threshold.html",
    license: "BSD-3-Clause",
    use: {
      en: "Technical reference for tuning a classifier's operating threshold against a task-specific metric instead of assuming 0.5.",
      vi: "Tài liệu kỹ thuật để chỉnh operating threshold theo metric của bài toán thay vì mặc định 0,5.",
      ko: "0.5를 당연시하지 않고 과업별 지표에 맞춰 분류 임곗값을 조정하는 기술 참고 자료입니다.",
    },
  },
  {
    id: "sklearn-calibration",
    title: "scikit-learn · Probability calibration",
    url: "https://scikit-learn.org/stable/modules/calibration.html",
    license: "BSD-3-Clause",
    use: {
      en: "Technical reference for checking whether predicted probabilities correspond to observed event frequencies.",
      vi: "Tài liệu kỹ thuật để kiểm tra xác suất dự đoán có khớp với tần suất sự kiện quan sát hay không.",
      ko: "예측 확률이 실제 사건 빈도와 일치하는지 확인하는 기술 참고 자료입니다.",
    },
  },
  {
    id: "sklearn-learning-curves",
    title: "scikit-learn · Learning curves and scalability",
    url: "https://scikit-learn.org/stable/auto_examples/model_selection/plot_learning_curve.html",
    license: "BSD-3-Clause",
    use: {
      en: "Technical reference for reading train-validation behavior together with fit and scoring cost as data grows.",
      vi: "Tài liệu kỹ thuật để đọc hành vi train-validation cùng chi phí fit và scoring khi dữ liệu tăng.",
      ko: "데이터 증가에 따른 학습-검증 성능과 적합·추론 비용을 함께 읽는 기술 참고 자료입니다.",
    },
  },
  {
    id: "nist-ai-rmf",
    title: "NIST · AI Risk Management Framework Playbook",
    url: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook",
    license: "U.S. government guidance · reference only",
    use: {
      en: "Risk-management reference for the Govern, Map, Measure, and Manage lifecycle. No NIST expression is reproduced.",
      vi: "Tài liệu quản trị rủi ro cho vòng đời Govern, Map, Measure và Manage. Không tái bản cách diễn đạt của NIST.",
      ko: "Govern, Map, Measure, Manage 수명주기를 위한 위험 관리 참고 자료입니다. NIST의 표현은 복제하지 않습니다.",
    },
  },
  {
    id: "nist-evaluation-2026",
    title: "NIST · Expanding the AI evaluation toolbox (2026)",
    url: "https://www.nist.gov/news-events/news/2026/02/new-report-expanding-ai-evaluation-toolbox-statistical-models",
    license: "U.S. government publication · reference only",
    use: {
      en: "Current reference for making evaluation assumptions, measurement targets, and uncertainty explicit.",
      vi: "Tài liệu hiện hành về việc nêu rõ giả định đánh giá, mục tiêu đo lường và uncertainty.",
      ko: "평가 가정, 측정 목표, 불확실성을 명시하는 최신 참고 자료입니다.",
    },
  },
  {
    id: "nist-monitoring-2026",
    title: "NIST · Monitoring deployed AI systems (2026)",
    url: "https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation",
    license: "U.S. government publication · reference only",
    use: {
      en: "Current reference on why post-deployment monitoring is necessary and why validated practices remain an active research area.",
      vi: "Tài liệu hiện hành về lý do cần giám sát sau triển khai và vì sao phương pháp đã kiểm chứng vẫn là lĩnh vực nghiên cứu mở.",
      ko: "배포 후 모니터링의 필요성과 검증된 방법론이 여전히 활발한 연구 과제인 이유를 다루는 최신 참고 자료입니다.",
    },
  },
  {
    id: "stanford-ai-index-2026",
    title: "Stanford HAI · 2026 AI Index",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance",
    license: "Reference only · no report content reused",
    use: {
      en: "Trend reference for the shift from model capability alone toward cost, reliability, and domain-specific performance.",
      vi: "Tài liệu xu hướng về sự dịch chuyển từ năng lực mô hình đơn thuần sang chi phí, độ tin cậy và hiệu năng theo domain.",
      ko: "모델 능력만이 아니라 비용, 신뢰성, 도메인별 성능으로 경쟁 기준이 이동하는 추세 참고 자료입니다.",
    },
  },
  {
    id: "wikidocs-index",
    title: "WikiDocs · DL Bible 07 topic index",
    url: "https://wikidocs.net/book/9057",
    license: "Historical link · reuse rights not relied on",
    use: {
      en: "Records the fragmented topic index that prompted this reconstruction. WikiDocs prose, code, equations, and media are not reproduced.",
      vi: "Ghi nhận mục lục rời rạc đã thúc đẩy việc tái cấu trúc. Không tái bản văn bản, mã, công thức hoặc media của WikiDocs.",
      ko: "이번 재구성의 계기가 된 분절된 주제 색인을 기록합니다. WikiDocs의 본문·코드·수식·미디어는 재사용하지 않습니다.",
    },
  },
];

export function getReference(id: ReferenceId) {
  return referenceSources.find((source) => source.id === id);
}

export type GuidedSupport = {
  step: string;
  prerequisites: string[];
  warmup: {
    question: string;
    answer: string;
  };
  project: {
    action: string;
    deliverable: string;
  };
  checkpoint: {
    question: string;
    answer: string;
  };
  references: ReferenceId[];
};

const guidedSupport: Record<CourseLanguage, Record<GuidedSlug, GuidedSupport>> = {
  en: {
    "what-machine-learning-learns": {
      step: "Frame the decision",
      prerequisites: ["Comfort reading a small table", "Percentages and averages"],
      warmup: {
        question: "If a model is 95% accurate, have we proved that it solves the right problem?",
        answer: "No. Accuracy only evaluates a chosen target, dataset, split, and error definition. People still have to justify the decision being supported.",
      },
      project: {
        action: "Define a late-delivery warning that an operations team can act on before an order leaves the warehouse.",
        deliverable: "One sentence each for the decision, prediction target, available evidence, and two costly errors.",
      },
      checkpoint: {
        question: "Which part can a learning algorithm choose by itself: the business purpose, the measured objective, or the human cost of an error?",
        answer: "It can optimize the measured objective. The purpose and the consequences of errors must be specified and reviewed by people.",
      },
      references: ["microsoft-ml-for-beginners", "google-ml-crash-course", "wikidocs-index"],
    },
    "data-features-and-labels": {
      step: "Audit the evidence",
      prerequisites: ["Chapter 01: frame the decision", "Rows, columns, and timestamps"],
      warmup: {
        question: "Is a recorded label the same thing as the real-world truth?",
        answer: "Usually not. A label is an operational proxy produced by a measurement or annotation process.",
      },
      project: {
        action: "Trace one delivery from checkout to its final status and mark when every field becomes available.",
        deliverable: "A one-row data lineage with the label rule, decision-time boundary, missing values, and leakage risks.",
      },
      checkpoint: {
        question: "Can a feature created after delivery be used for a warning issued before warehouse departure?",
        answer: "No. Even if it predicts well historically, it is unavailable at the actual decision time and creates target leakage.",
      },
      references: ["google-ml-crash-course", "scikit-learn", "microsoft-ml-for-beginners"],
    },
    "train-validation-and-test": {
      step: "Protect the evaluation",
      prerequisites: ["Chapters 01–02", "Basic idea of fitting a model"],
      warmup: {
        question: "Why not keep choosing models until one scores best on the test set?",
        answer: "Repeated test-set use turns the test result into feedback for model selection. It stops being an independent final estimate.",
      },
      project: {
        action: "Split twelve months of delivery records so the evaluation resembles predicting future orders.",
        deliverable: "A time-based train, validation, and test plan with dates and a written reason for each boundary.",
      },
      checkpoint: {
        question: "Which set supports the final performance claim?",
        answer: "The untouched test set, after model and threshold choices are complete.",
      },
      references: ["scikit-learn", "google-ml-crash-course", "statistical-learning"],
    },
    "metrics-and-thresholds": {
      step: "Choose the operating point",
      prerequisites: ["Chapter 03: protected evaluation", "Fractions and percentages"],
      warmup: {
        question: "Can 99% accuracy describe a useless late-delivery model?",
        answer: "Yes. If only 1% of orders are late, always predicting 'on time' reaches 99% accuracy while finding no late orders.",
      },
      project: {
        action: "Choose how many orders the operations team can investigate and set a warning threshold around that capacity.",
        deliverable: "A confusion matrix plus precision, recall, and a threshold justified by the costs of missed and false warnings.",
      },
      checkpoint: {
        question: "Does a probability score of 0.7 automatically mean the order must be flagged?",
        answer: "No. A threshold converts a score into an action and should reflect error costs, capacity, and calibration.",
      },
      references: ["google-ml-crash-course", "scikit-learn"],
    },
    "bias-variance-and-overfitting": {
      step: "Diagnose the gap",
      prerequisites: ["Chapters 03–04", "Training and validation scores"],
      warmup: {
        question: "Is lower training error always evidence of a better model?",
        answer: "No. Training error can keep falling while validation performance stalls or worsens.",
      },
      project: {
        action: "Compare a simple baseline with a flexible model across learning curves and meaningful order slices.",
        deliverable: "A diagnosis of underfitting, healthy fit, overfitting, or distribution shift, followed by one controlled next experiment.",
      },
      checkpoint: {
        question: "What pattern most directly suggests high variance?",
        answer: "Strong training performance together with a persistent gap to weaker validation performance.",
      },
      references: ["google-ml-crash-course", "dive-into-deep-learning", "scikit-learn", "statistical-learning"],
    },
    "end-to-end-ml-workflow": {
      step: "Operate the system",
      prerequisites: ["Chapters 01–05", "A chosen baseline and evaluation plan"],
      warmup: {
        question: "Does deployment finish the machine-learning project?",
        answer: "No. Deployment starts an operating loop of monitoring, delayed outcome collection, diagnosis, and controlled updates.",
      },
      project: {
        action: "Connect the late-delivery model to a real warning workflow, fallback action, and monitoring owner.",
        deliverable: "A one-page system card covering decision, data contract, model version, threshold, fallback, monitoring, and retraining trigger.",
      },
      checkpoint: {
        question: "What should happen when the input distribution changes but labels arrive weeks later?",
        answer: "Treat the shift as an investigation signal, monitor operational behavior, preserve a safe fallback, and wait for outcome evidence before claiming degradation.",
      },
      references: ["google-ml-crash-course", "microsoft-ml-for-beginners", "scikit-learn"],
    },
  },
  vi: {
    "what-machine-learning-learns": {
      step: "Định khung quyết định",
      prerequisites: ["Đọc được một bảng dữ liệu nhỏ", "Tỷ lệ phần trăm và trung bình"],
      warmup: {
        question: "Nếu mô hình đạt accuracy 95%, ta đã chứng minh nó giải đúng bài toán chưa?",
        answer: "Chưa. Accuracy chỉ đánh giá target, dữ liệu, phép chia và định nghĩa lỗi đã chọn. Con người vẫn phải chứng minh quyết định đó có đúng mục đích hay không.",
      },
      project: {
        action: "Định nghĩa cảnh báo giao hàng trễ mà nhóm vận hành có thể xử lý trước khi đơn rời kho.",
        deliverable: "Mỗi mục một câu: quyết định, target dự đoán, bằng chứng sẵn có và hai loại lỗi tốn kém.",
      },
      checkpoint: {
        question: "Thuật toán có thể tự chọn phần nào: mục đích kinh doanh, objective đo được hay chi phí con người của một lỗi?",
        answer: "Nó có thể tối ưu objective đo được. Mục đích và hậu quả của lỗi phải do con người xác định và phản biện.",
      },
      references: ["microsoft-ml-for-beginners", "google-ml-crash-course", "wikidocs-index"],
    },
    "data-features-and-labels": {
      step: "Kiểm toán bằng chứng",
      prerequisites: ["Chương 01: định khung quyết định", "Hàng, cột và timestamp"],
      warmup: {
        question: "Nhãn được ghi lại có đồng nhất với sự thật ngoài đời không?",
        answer: "Thường là không. Nhãn là một proxy vận hành được tạo ra bởi quy trình đo lường hoặc gán nhãn.",
      },
      project: {
        action: "Theo dấu một đơn hàng từ lúc thanh toán đến trạng thái cuối và đánh dấu thời điểm từng trường xuất hiện.",
        deliverable: "Dòng đời của một hàng dữ liệu, gồm quy tắc nhãn, ranh giới thời điểm quyết định, dữ liệu thiếu và nguy cơ leakage.",
      },
      checkpoint: {
        question: "Có thể dùng feature được tạo sau khi giao hàng cho cảnh báo trước khi đơn rời kho không?",
        answer: "Không. Dù dự đoán tốt trên dữ liệu lịch sử, feature đó chưa tồn tại ở thời điểm quyết định và gây target leakage.",
      },
      references: ["google-ml-crash-course", "scikit-learn", "microsoft-ml-for-beginners"],
    },
    "train-validation-and-test": {
      step: "Bảo vệ phép đánh giá",
      prerequisites: ["Chương 01–02", "Ý tưởng cơ bản về fit mô hình"],
      warmup: {
        question: "Vì sao không thử mô hình liên tục cho đến khi một mô hình đạt điểm test cao nhất?",
        answer: "Việc dùng test lặp lại biến kết quả test thành phản hồi để chọn mô hình. Nó không còn là ước lượng cuối độc lập.",
      },
      project: {
        action: "Chia mười hai tháng dữ liệu giao hàng sao cho đánh giá giống việc dự đoán các đơn trong tương lai.",
        deliverable: "Kế hoạch train, validation và test theo thời gian, có ngày tháng và lý do cho từng ranh giới.",
      },
      checkpoint: {
        question: "Tập nào hỗ trợ tuyên bố hiệu năng cuối cùng?",
        answer: "Tập test chưa bị động đến, sau khi hoàn tất lựa chọn mô hình và threshold.",
      },
      references: ["scikit-learn", "google-ml-crash-course", "statistical-learning"],
    },
    "metrics-and-thresholds": {
      step: "Chọn điểm vận hành",
      prerequisites: ["Chương 03: đánh giá độc lập", "Phân số và phần trăm"],
      warmup: {
        question: "Accuracy 99% có thể mô tả một mô hình giao hàng trễ vô dụng không?",
        answer: "Có. Nếu chỉ 1% đơn bị trễ, luôn dự đoán 'đúng giờ' đạt 99% accuracy nhưng không tìm được đơn trễ nào.",
      },
      project: {
        action: "Xác định số đơn nhóm vận hành có thể kiểm tra và đặt threshold cảnh báo theo năng lực đó.",
        deliverable: "Confusion matrix, precision, recall và threshold được giải thích bằng chi phí bỏ sót và cảnh báo sai.",
      },
      checkpoint: {
        question: "Điểm xác suất 0,7 có tự động có nghĩa là phải cảnh báo không?",
        answer: "Không. Threshold biến điểm số thành hành động và phải phản ánh chi phí lỗi, năng lực xử lý và calibration.",
      },
      references: ["google-ml-crash-course", "scikit-learn"],
    },
    "bias-variance-and-overfitting": {
      step: "Chẩn đoán khoảng cách",
      prerequisites: ["Chương 03–04", "Điểm train và validation"],
      warmup: {
        question: "Training error thấp hơn có luôn là bằng chứng của mô hình tốt hơn không?",
        answer: "Không. Training error có thể tiếp tục giảm trong khi validation ngừng cải thiện hoặc xấu đi.",
      },
      project: {
        action: "So sánh baseline đơn giản với mô hình linh hoạt bằng learning curve và các lát cắt đơn hàng có ý nghĩa.",
        deliverable: "Chẩn đoán underfitting, fit hợp lý, overfitting hoặc distribution shift, rồi đề xuất một thí nghiệm có kiểm soát.",
      },
      checkpoint: {
        question: "Mẫu hình nào gợi ý trực tiếp nhất về variance cao?",
        answer: "Hiệu năng train rất mạnh nhưng tồn tại khoảng cách ổn định so với hiệu năng validation yếu hơn.",
      },
      references: ["google-ml-crash-course", "dive-into-deep-learning", "scikit-learn", "statistical-learning"],
    },
    "end-to-end-ml-workflow": {
      step: "Vận hành hệ thống",
      prerequisites: ["Chương 01–05", "Baseline và kế hoạch đánh giá đã chọn"],
      warmup: {
        question: "Triển khai có phải là bước kết thúc dự án học máy không?",
        answer: "Không. Triển khai mở đầu vòng vận hành gồm giám sát, thu thập outcome trễ, chẩn đoán và cập nhật có kiểm soát.",
      },
      project: {
        action: "Kết nối mô hình giao hàng trễ với luồng cảnh báo thực tế, hành động dự phòng và người chịu trách nhiệm giám sát.",
        deliverable: "System card một trang gồm quyết định, data contract, phiên bản mô hình, threshold, fallback, monitoring và điều kiện retrain.",
      },
      checkpoint: {
        question: "Nên làm gì khi phân phối input thay đổi nhưng label phải vài tuần sau mới có?",
        answer: "Xem shift là tín hiệu điều tra, theo dõi hành vi vận hành, giữ fallback an toàn và chờ bằng chứng outcome trước khi kết luận mô hình suy giảm.",
      },
      references: ["google-ml-crash-course", "microsoft-ml-for-beginners", "scikit-learn"],
    },
  },
  ko: {
    "what-machine-learning-learns": {
      step: "의사결정 정의",
      prerequisites: ["작은 표를 읽는 능력", "백분율과 평균"],
      warmup: {
        question: "모델 정확도가 95%라면 올바른 문제를 해결했다고 증명한 것일까요?",
        answer: "아닙니다. 정확도는 선택한 타깃, 데이터, 분할, 오류 정의만 평가합니다. 어떤 의사결정을 지원해야 하는지는 사람이 정당화해야 합니다.",
      },
      project: {
        action: "주문이 창고를 떠나기 전에 운영팀이 대응할 수 있는 배송 지연 경보를 정의합니다.",
        deliverable: "의사결정, 예측 타깃, 이용 가능한 증거, 비용이 큰 두 오류를 각각 한 문장으로 작성합니다.",
      },
      checkpoint: {
        question: "학습 알고리즘이 스스로 선택할 수 있는 것은 사업 목적, 측정 목적함수, 오류의 인간적 비용 중 무엇일까요?",
        answer: "측정된 목적함수는 최적화할 수 있습니다. 목적과 오류의 결과는 사람이 정의하고 검토해야 합니다.",
      },
      references: ["microsoft-ml-for-beginners", "google-ml-crash-course", "wikidocs-index"],
    },
    "data-features-and-labels": {
      step: "증거 감사",
      prerequisites: ["1장: 의사결정 정의", "행·열·타임스탬프"],
      warmup: {
        question: "기록된 레이블은 현실의 진실과 같을까요?",
        answer: "대부분 그렇지 않습니다. 레이블은 측정이나 주석 과정이 만든 운영적 대리값입니다.",
      },
      project: {
        action: "결제부터 최종 상태까지 한 배송을 추적하고 각 필드가 언제 생기는지 표시합니다.",
        deliverable: "레이블 규칙, 의사결정 시점 경계, 결측값, 누수 위험을 포함한 한 행의 데이터 계보를 만듭니다.",
      },
      checkpoint: {
        question: "배송 후 생성된 특징을 창고 출발 전 경보에 사용할 수 있을까요?",
        answer: "안 됩니다. 과거 데이터에서 잘 예측하더라도 실제 의사결정 시점에는 존재하지 않아 타깃 누수를 만듭니다.",
      },
      references: ["google-ml-crash-course", "scikit-learn", "microsoft-ml-for-beginners"],
    },
    "train-validation-and-test": {
      step: "평가 보호",
      prerequisites: ["1–2장", "모델 적합의 기본 개념"],
      warmup: {
        question: "테스트 점수가 가장 높은 모델이 나올 때까지 계속 고르면 왜 안 될까요?",
        answer: "반복된 테스트 사용은 테스트 결과를 모델 선택 피드백으로 바꿉니다. 더 이상 독립적인 최종 추정치가 아닙니다.",
      },
      project: {
        action: "미래 주문 예측과 비슷한 평가가 되도록 12개월 배송 기록을 나눕니다.",
        deliverable: "각 경계의 날짜와 이유가 적힌 시간 기반 학습·검증·테스트 계획을 만듭니다.",
      },
      checkpoint: {
        question: "최종 성능 주장을 뒷받침하는 데이터는 무엇일까요?",
        answer: "모델과 임곗값 선택을 끝낼 때까지 건드리지 않은 테스트 세트입니다.",
      },
      references: ["scikit-learn", "google-ml-crash-course", "statistical-learning"],
    },
    "metrics-and-thresholds": {
      step: "운영점 선택",
      prerequisites: ["3장: 보호된 평가", "분수와 백분율"],
      warmup: {
        question: "정확도 99%가 쓸모없는 배송 지연 모델을 설명할 수도 있을까요?",
        answer: "그렇습니다. 지연 주문이 1%뿐이면 항상 '정시'라고 예측해도 정확도 99%지만 지연 주문은 하나도 찾지 못합니다.",
      },
      project: {
        action: "운영팀이 조사할 수 있는 주문 수를 정하고 그 용량에 맞춰 경보 임곗값을 고릅니다.",
        deliverable: "혼동행렬, 정밀도, 재현율과 누락·오경보 비용으로 정당화한 임곗값을 작성합니다.",
      },
      checkpoint: {
        question: "확률 점수 0.7이면 자동으로 경보를 보내야 할까요?",
        answer: "아닙니다. 임곗값은 점수를 행동으로 바꾸며 오류 비용, 처리 용량, 보정 상태를 반영해야 합니다.",
      },
      references: ["google-ml-crash-course", "scikit-learn"],
    },
    "bias-variance-and-overfitting": {
      step: "간극 진단",
      prerequisites: ["3–4장", "학습·검증 점수"],
      warmup: {
        question: "학습 오차가 낮아지면 언제나 더 좋은 모델일까요?",
        answer: "아닙니다. 학습 오차는 계속 내려가도 검증 성능은 멈추거나 나빠질 수 있습니다.",
      },
      project: {
        action: "단순 기준선과 유연한 모델을 학습 곡선과 의미 있는 주문 하위 집단에서 비교합니다.",
        deliverable: "과소적합, 건강한 적합, 과적합, 분포 이동 중 하나를 진단하고 다음 통제 실험을 제안합니다.",
      },
      checkpoint: {
        question: "높은 분산을 가장 직접적으로 보여 주는 패턴은 무엇일까요?",
        answer: "학습 성능은 강하지만 더 약한 검증 성능과의 간극이 지속되는 패턴입니다.",
      },
      references: ["google-ml-crash-course", "dive-into-deep-learning", "scikit-learn", "statistical-learning"],
    },
    "end-to-end-ml-workflow": {
      step: "시스템 운영",
      prerequisites: ["1–5장", "선택한 기준선과 평가 계획"],
      warmup: {
        question: "배포가 머신러닝 프로젝트의 끝일까요?",
        answer: "아닙니다. 배포는 모니터링, 늦게 도착하는 결과 수집, 진단, 통제된 업데이트로 이어지는 운영 순환의 시작입니다.",
      },
      project: {
        action: "배송 지연 모델을 실제 경보 흐름, 대체 행동, 모니터링 담당자와 연결합니다.",
        deliverable: "의사결정, 데이터 계약, 모델 버전, 임곗값, 대체 행동, 모니터링, 재학습 조건을 담은 한 장 시스템 카드를 만듭니다.",
      },
      checkpoint: {
        question: "입력 분포가 바뀌었지만 레이블이 몇 주 뒤에 올 때 무엇을 해야 할까요?",
        answer: "이동을 조사 신호로 보고 운영 행동을 관찰하며 안전한 대체 수단을 유지합니다. 성능 저하를 주장하기 전에 결과 증거를 기다립니다.",
      },
      references: ["google-ml-crash-course", "microsoft-ml-for-beginners", "scikit-learn"],
    },
  },
};

export const courseUi = {
  en: {
    guided: "Guided course",
    guidedBody: "Six chapters build one late-delivery risk system from decision framing to monitoring.",
    step: "STEP",
    prerequisites: "Before you start",
    warmup: "Warm-up",
    reveal: "Reveal the reasoning",
    project: "Course project · Late-delivery risk",
    deliverable: "Deliverable",
    checkpoint: "Knowledge check",
    furtherReading: "References and further reading",
    referenceAtlas: "Reference atlas",
    referenceBody: "Use the remaining 116 notes to look up a model, formula, or failure pattern. They are supporting notes, not the recommended reading order.",
    openAtlas: "Open the 122-topic atlas",
    historicalOutline: "Historical WikiDocs topic",
    historicalOutlineBody: "This link records the topic that appeared in the earlier WikiDocs index. Gradient Atlas does not reproduce or translate that page.",
  },
  vi: {
    guided: "Khóa học có hướng dẫn",
    guidedBody: "Sáu chương xây dựng một hệ thống dự báo giao hàng trễ, từ định khung quyết định đến monitoring.",
    step: "BƯỚC",
    prerequisites: "Trước khi bắt đầu",
    warmup: "Khởi động",
    reveal: "Xem lập luận",
    project: "Dự án xuyên suốt · Rủi ro giao hàng trễ",
    deliverable: "Sản phẩm cần nộp",
    checkpoint: "Kiểm tra kiến thức",
    furtherReading: "Tài liệu tham khảo và đọc thêm",
    referenceAtlas: "Atlas tra cứu",
    referenceBody: "Dùng 116 ghi chú còn lại để tra mô hình, công thức hoặc kiểu thất bại. Đây là tài liệu hỗ trợ, không phải thứ tự đọc khuyến nghị.",
    openAtlas: "Mở atlas 122 chủ đề",
    historicalOutline: "Chủ đề WikiDocs trước đây",
    historicalOutlineBody: "Liên kết này ghi nhận chủ đề từng xuất hiện trong mục lục WikiDocs. Gradient Atlas không tái bản hoặc dịch trang đó.",
  },
  ko: {
    guided: "가이드 코스",
    guidedBody: "여섯 장에서 의사결정 정의부터 모니터링까지 하나의 배송 지연 위험 시스템을 만듭니다.",
    step: "단계",
    prerequisites: "시작하기 전에",
    warmup: "준비 질문",
    reveal: "추론 보기",
    project: "코스 프로젝트 · 배송 지연 위험",
    deliverable: "결과물",
    checkpoint: "지식 점검",
    furtherReading: "참고 자료와 더 읽을거리",
    referenceAtlas: "참고 아틀라스",
    referenceBody: "나머지 116개 노트는 모델, 수식, 실패 패턴을 찾아볼 때 사용하세요. 권장 읽기 순서가 아닌 보조 자료입니다.",
    openAtlas: "122개 주제 아틀라스 열기",
    historicalOutline: "과거 WikiDocs 주제",
    historicalOutlineBody: "이 링크는 이전 WikiDocs 색인에 있던 주제를 기록합니다. Gradient Atlas는 해당 페이지를 복제하거나 번역하지 않습니다.",
  },
} satisfies Record<CourseLanguage, Record<string, string>>;

export function getGuidedSupport(language: CourseLanguage, slug: string) {
  if (!guidedSlugs.includes(slug as GuidedSlug)) return undefined;
  return guidedSupport[language][slug as GuidedSlug];
}

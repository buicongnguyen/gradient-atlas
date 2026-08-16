import type { Language, Lesson } from "./content";
import { getReference, type ReferenceId, type ReferenceSource } from "./guided-course";

type ResourceKind = "book" | "course" | "guide";
type Localized = Record<Language, string>;
type ReadingShelfCopy = { eyebrow: string; title: string; body: string; open: string; kinds: Record<ResourceKind, string> };
type Target = { sourceId: ReferenceId; title: string; url: string; kind: ResourceKind };
type Route = { id: string; match: RegExp; focus: Localized; purpose: Localized; targets: [Target, Target, Target, Target] };

const ui: Record<Language, Omit<ReadingShelfCopy, "title" | "body">> = {
  en: { eyebrow: "Continue learning", open: "Open exact section", kinds: { book: "Book chapter", course: "Course module", guide: "Technical section" } },
  vi: { eyebrow: "Học tiếp", open: "Mở đúng mục", kinds: { book: "Chương sách", course: "Mô-đun khóa học", guide: "Mục kỹ thuật" } },
  ko: { eyebrow: "계속 학습하기", open: "해당 섹션 열기", kinds: { book: "도서 장", course: "과정 모듈", guide: "기술 섹션" } },
};
const L = (en: string, vi: string, ko: string): Localized => ({ en, vi, ko });
const T = (sourceId: ReferenceId, title: string, url: string, kind: ResourceKind): Target => ({ sourceId, title, url, kind });

// Ordered as orientation/intuition → implementation → deeper theory → practice/systems.
// Every target is a chapter, lesson, or user-guide section rather than a publisher home page.
const routes: Route[] = [
  { id: "reinforcement", match: /reinforcement|robot-learning|robotics|reward|policy|agent/,
    focus: L("reinforcement learning and sequential decisions", "học tăng cường và quyết định tuần tự", "강화학습과 순차적 의사결정"),
    purpose: L("Build the agent–environment loop first, then connect value estimation, Q-learning code, and practical control.", "Nắm vòng lặp agent–environment trước, rồi nối sang ước lượng value, mã Q-learning và điều khiển thực hành.", "에이전트–환경 루프를 먼저 잡고 가치 추정, Q-learning 코드, 실제 제어로 이어갑니다."),
    targets: [
      T("dive-into-deep-learning", "D2L §17 · Reinforcement Learning", "https://d2l.ai/chapter_reinforcement-learning/index.html", "book"),
      T("microsoft-ml-for-beginners", "Microsoft ML for Beginners · Reinforcement learning", "https://github.com/microsoft/ML-For-Beginners/tree/main/8-Reinforcement", "course"),
      T("pytorch-tutorials", "PyTorch Tutorials · Reinforcement Learning (DQN)", "https://docs.pytorch.org/tutorials/intermediate/reinforcement_q_learning.html", "guide"),
      T("probabilistic-ml", "Probabilistic ML · Advanced Topics, sequential decisions", "https://probml.github.io/pml-book/book2.html", "book") ] },
  { id: "nlp", match: /natural-language|nlp|language-model|transformer|token|attention|text|embedding/,
    focus: L("language models, attention, and text representations", "mô hình ngôn ngữ, attention và biểu diễn văn bản", "언어 모델, 어텐션, 텍스트 표현"),
    purpose: L("Move from tokenization to attention, then implement a Transformer workflow and inspect a complete NLP lesson.", "Đi từ tokenization đến attention, sau đó triển khai quy trình Transformer và xem một bài NLP hoàn chỉnh.", "토큰화에서 어텐션으로 이동한 뒤 Transformer 워크플로를 구현하고 완전한 NLP 수업을 살펴봅니다."),
    targets: [
      T("huggingface-course", "Hugging Face LLM Course · Transformer models", "https://huggingface.co/learn/llm-course/en/chapter1/4", "course"),
      T("dive-into-deep-learning", "D2L §11 · Attention and Transformers", "https://d2l.ai/chapter_attention-mechanisms-and-transformers/index.html", "book"),
      T("pytorch-tutorials", "PyTorch Tutorials · Language modeling with nn.Transformer", "https://docs.pytorch.org/tutorials/beginner/transformer_tutorial.html", "guide"),
      T("microsoft-ml-for-beginners", "Microsoft ML for Beginners · NLP", "https://github.com/microsoft/ML-For-Beginners/tree/main/6-NLP", "course") ] },
  { id: "vision", match: /computer-vision|image|convolution|object-detection|recognition|localization/,
    focus: L("computer vision and convolutional representations", "thị giác máy tính và biểu diễn tích chập", "컴퓨터 비전과 합성곱 표현"),
    purpose: L("Start with convolutional structure, train an image classifier, then examine transfer learning and modern architectures.", "Bắt đầu từ cấu trúc tích chập, huấn luyện bộ phân loại ảnh, rồi xem transfer learning và kiến trúc hiện đại.", "합성곱 구조에서 시작해 이미지 분류기를 학습하고 전이학습과 최신 구조를 살펴봅니다."),
    targets: [
      T("dive-into-deep-learning", "D2L §7 · Convolutional Neural Networks", "https://d2l.ai/chapter_convolutional-neural-networks/index.html", "book"),
      T("pytorch-tutorials", "PyTorch Tutorials · Training a classifier", "https://docs.pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html", "guide"),
      T("pytorch-tutorials", "PyTorch Tutorials · Transfer learning for vision", "https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html", "guide"),
      T("dive-into-deep-learning", "D2L §8 · Modern CNNs", "https://d2l.ai/chapter_convolutional-modern/index.html", "book") ] },
  { id: "deep", match: /deep-learning|neural|perceptron|autoencoder|generative|gan|feature-learning|self-supervised/,
    focus: L("neural networks, representation, and optimization", "mạng nơ-ron, biểu diễn và tối ưu hóa", "신경망, 표현, 최적화"),
    purpose: L("Trace a prediction through a network, understand backpropagation, implement the training loop, then study regularization.", "Theo dấu dự đoán qua mạng, hiểu backpropagation, triển khai training loop rồi học regularization.", "예측의 흐름, 역전파, 학습 루프 구현, 정규화를 차례로 학습합니다."),
    targets: [
      T("google-ml-crash-course", "Google MLCC · Neural networks", "https://developers.google.com/machine-learning/crash-course/neural-networks", "course"),
      T("dive-into-deep-learning", "D2L §5 · Multilayer Perceptrons", "https://d2l.ai/chapter_multilayer-perceptrons/index.html", "book"),
      T("pytorch-tutorials", "PyTorch Tutorials · Optimization loop", "https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html", "guide"),
      T("deep-learning-book", "Deep Learning Book · Regularization", "https://www.deeplearningbook.org/contents/regularization.html", "book") ] },
  { id: "unsupervised", match: /unsupervised|cluster|dimensionality|metric-learning|dictionary|anomaly|association-rule|latent|sparse/,
    focus: L("unsupervised structure, clusters, and representations", "cấu trúc không giám sát, cụm và biểu diễn", "비지도 구조, 군집, 표현"),
    purpose: L("Compare problem families, implement the matching estimator, then examine dimensionality reduction and anomaly detection.", "So sánh các họ bài toán, triển khai estimator phù hợp, rồi xem giảm chiều và phát hiện bất thường.", "문제군과 추정기를 연결한 뒤 차원 축소와 이상 탐지를 살펴봅니다."),
    targets: [
      T("scikit-learn", "scikit-learn §2.3 · Clustering", "https://scikit-learn.org/stable/modules/clustering.html", "guide"),
      T("microsoft-ml-for-beginners", "Microsoft ML for Beginners · Clustering", "https://github.com/microsoft/ML-For-Beginners/tree/main/5-Clustering", "course"),
      T("scikit-learn", "scikit-learn §7.5 · Dimensionality reduction", "https://scikit-learn.org/stable/modules/unsupervised_reduction.html", "guide"),
      T("scikit-learn", "scikit-learn §2.7 · Outlier detection", "https://scikit-learn.org/stable/modules/outlier_detection.html", "guide") ] },
  { id: "probability", match: /bayes|gaussian|probab|likelihood|inference|graphical|relevance-vector/,
    focus: L("probabilistic modeling and uncertainty", "mô hình xác suất và độ bất định", "확률 모델링과 불확실성"),
    purpose: L("Begin with probability notation, connect Bayes’ rule to estimators, then study Gaussian processes and graphical structure.", "Bắt đầu với ký hiệu xác suất, nối định lý Bayes với estimator, rồi học Gaussian process và cấu trúc đồ thị.", "확률 표기에서 베이즈 추정기, 가우시안 프로세스, 그래프 구조로 이어갑니다."),
    targets: [
      T("mathematics-for-ml", "Mathematics for ML · Probability and Distributions", "https://mml-book.github.io/book/mml-book.pdf#page=207", "book"),
      T("scikit-learn", "scikit-learn §1.9 · Naive Bayes", "https://scikit-learn.org/stable/modules/naive_bayes.html", "guide"),
      T("scikit-learn", "scikit-learn §1.7 · Gaussian Processes", "https://scikit-learn.org/stable/modules/gaussian_process.html", "guide"),
      T("probabilistic-ml", "Probabilistic ML · Introduction, chapters", "https://probml.github.io/pml-book/book1.html", "book") ] },
  { id: "linear", match: /linear-regression|regression-analysis|gradient|least-squares|continuous-target/,
    focus: L("linear regression, loss, and gradient-based fitting", "hồi quy tuyến tính, hàm loss và tối ưu bằng gradient", "선형 회귀, 손실, 경사 기반 적합"),
    purpose: L("Derive the model and loss, inspect gradient descent, implement the estimator, then check assumptions and diagnostics.", "Suy ra mô hình và loss, xem gradient descent, triển khai estimator rồi kiểm tra giả định và chẩn đoán.", "모델과 손실을 유도하고 경사하강법, 추정기 구현, 진단을 확인합니다."),
    targets: [
      T("google-ml-crash-course", "Google MLCC · Linear regression", "https://developers.google.com/machine-learning/crash-course/linear-regression", "course"),
      T("dive-into-deep-learning", "D2L §3 · Linear regression", "https://d2l.ai/chapter_linear-regression/index.html", "book"),
      T("scikit-learn", "scikit-learn §1.1 · Linear Models", "https://scikit-learn.org/stable/modules/linear_model.html", "guide"),
      T("microsoft-ml-for-beginners", "Microsoft ML for Beginners · Regression", "https://github.com/microsoft/ML-For-Beginners/tree/main/2-Regression", "course") ] },
  { id: "classification", match: /classification|logistic|confusion|roc|threshold|precision|recall|f1|calibration|naive-bayes|support-vector|decision-tree|ensemble/,
    focus: L("classification, scores, thresholds, and model families", "phân loại, score, threshold và các họ mô hình", "분류, 점수, 임곗값, 모델군"),
    purpose: L("Separate probability from decision, compare metrics, inspect model families, then tune the operating threshold.", "Tách xác suất khỏi quyết định, so sánh metric, xem các họ mô hình rồi chỉnh operating threshold.", "확률과 결정을 분리하고 지표와 모델군을 비교한 뒤 운영 임곗값을 조정합니다."),
    targets: [
      T("google-ml-crash-course", "Google MLCC · Classification", "https://developers.google.com/machine-learning/crash-course/classification", "course"),
      T("scikit-learn", "scikit-learn §3.4 · Metrics and scoring", "https://scikit-learn.org/stable/modules/model_evaluation.html", "guide"),
      T("microsoft-ml-for-beginners", "Microsoft ML for Beginners · Classification", "https://github.com/microsoft/ML-For-Beginners/tree/main/4-Classification", "course"),
      T("sklearn-threshold-tuning", "scikit-learn §3.3 · Decision threshold", "https://scikit-learn.org/stable/modules/classification_threshold.html", "guide") ] },
  { id: "evaluation", match: /evaluation|metric|validation|test|split|cross-validation|model-selection|hyperparameter|comparison|ranking|imbalance|reproducib/,
    focus: L("evaluation design and trustworthy model selection", "thiết kế đánh giá và chọn mô hình đáng tin cậy", "평가 설계와 신뢰할 수 있는 모델 선택"),
    purpose: L("Choose the split before the metric, estimate uncertainty with resampling, tune without leakage, and report task-specific evidence.", "Chọn cách chia dữ liệu trước metric, ước lượng bất định bằng resampling, tuning không leakage và báo cáo bằng chứng đúng bài toán.", "지표보다 분할을 먼저 정하고 재표본으로 불확실성을 추정하며 누수 없이 튜닝합니다."),
    targets: [
      T("scikit-learn", "scikit-learn §3.1 · Cross-validation", "https://scikit-learn.org/stable/modules/cross_validation.html", "guide"),
      T("scikit-learn", "scikit-learn §3.2 · Hyper-parameter tuning", "https://scikit-learn.org/stable/modules/grid_search.html", "guide"),
      T("google-ml-crash-course", "Google MLCC · Generalization and overfitting", "https://developers.google.com/machine-learning/crash-course/overfitting", "course"),
      T("sklearn-mooc", "scikit-learn MOOC · Nested cross-validation", "https://inria.github.io/scikit-learn-mooc/python_scripts/cross_validation_nested.html", "course") ] },
  { id: "generalization", match: /bias|variance|overfit|underfit|complexity|regularization|fitting|learning-curve|data-vs-model/,
    focus: L("generalization, capacity, and regularization", "khả năng khái quát, capacity và regularization", "일반화, 모델 용량, 정규화"),
    purpose: L("Diagnose train–validation behavior, connect capacity to error, apply regularization, then decide whether data or model work comes next.", "Chẩn đoán train–validation, nối capacity với error, áp dụng regularization rồi quyết định cải thiện dữ liệu hay mô hình.", "학습–검증 동작과 용량·오차를 연결하고 정규화한 뒤 다음 작업을 결정합니다."),
    targets: [
      T("dive-into-deep-learning", "D2L §3.6 · Generalization", "https://d2l.ai/chapter_linear-regression/generalization.html", "book"),
      T("google-ml-crash-course", "Google MLCC · Generalization and overfitting", "https://developers.google.com/machine-learning/crash-course/overfitting", "course"),
      T("sklearn-learning-curves", "scikit-learn · Learning curves", "https://scikit-learn.org/stable/auto_examples/model_selection/plot_learning_curve.html", "guide"),
      T("deep-learning-book", "Deep Learning Book · Regularization", "https://www.deeplearningbook.org/contents/regularization.html", "book") ] },
  { id: "data", match: /data|feature|label|preprocess|normalization|clean|collection|visualization|ingestion|sampling|leakage/,
    focus: L("data quality, features, labels, and transformations", "chất lượng dữ liệu, feature, label và phép biến đổi", "데이터 품질, 특징, 레이블, 변환"),
    purpose: L("Define what one row means, inspect distributions, fit transformations safely, and preserve the same contract in a pipeline.", "Xác định ý nghĩa một dòng dữ liệu, xem phân phối, fit phép biến đổi an toàn và giữ cùng contract trong pipeline.", "한 행의 의미와 분포를 점검하고 변환을 안전하게 적합해 파이프라인 계약을 유지합니다."),
    targets: [
      T("google-ml-crash-course", "Google MLCC · Numerical data", "https://developers.google.com/machine-learning/crash-course/numerical-data", "course"),
      T("scikit-learn", "scikit-learn §7.3 · Preprocessing", "https://scikit-learn.org/stable/modules/preprocessing.html", "guide"),
      T("scikit-learn", "scikit-learn §7.1 · Pipelines", "https://scikit-learn.org/stable/modules/compose.html", "guide"),
      T("microsoft-ml-for-beginners", "Microsoft ML for Beginners · Visualize and clean data", "https://github.com/microsoft/ML-For-Beginners/tree/main/2-Regression/2-Data", "course") ] },
  { id: "production", match: /workflow|pipeline|production|deployment|monitor|mlops|serving|updating|feedback-loop|system|scalab|case-study|end-to-end|error-analysis|pitfall|debug|shift|over-engineering|operations/,
    focus: L("end-to-end ML systems and operational feedback", "hệ thống ML đầu-cuối và feedback vận hành", "엔드투엔드 ML 시스템과 운영 피드백"),
    purpose: L("Frame the product decision, map pipeline contracts, plan deployment and monitoring, then manage risks and feedback loops.", "Định hình quyết định sản phẩm, lập bản đồ contract pipeline, lên kế hoạch triển khai–giám sát rồi quản lý rủi ro và feedback loop.", "제품 결정을 정의하고 파이프라인 계약, 배포·모니터링, 위험·피드백 루프를 관리합니다."),
    targets: [
      T("google-problem-framing", "Google · Framing an ML problem", "https://developers.google.com/machine-learning/problem-framing/ml-framing", "guide"),
      T("google-ml-crash-course", "Google MLCC · Production ML systems", "https://developers.google.com/machine-learning/crash-course/production-ml-systems", "course"),
      T("full-stack-deep-learning", "Full Stack Deep Learning · Deployment", "https://fullstackdeeplearning.com/course/2022/lecture-5-deployment/", "course"),
      T("google-production-monitoring", "Google MLCC · Monitoring pipelines", "https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring", "guide") ] },
  { id: "foundation", match: /.*/,
    focus: L("machine-learning foundations and problem formulation", "nền tảng học máy và cách định hình bài toán", "머신러닝 기초와 문제 정의"),
    purpose: L("Clarify the learning task, distinguish models from training procedures, see a worked lesson, and connect the pieces into a system.", "Làm rõ learning task, phân biệt model với quy trình huấn luyện, xem bài thực hành rồi nối các phần thành hệ thống.", "학습 과업과 모델·학습 절차를 구분하고 실습을 거쳐 시스템으로 연결합니다."),
    targets: [
      T("google-ml-crash-course", "Google · Introduction to machine learning", "https://developers.google.com/machine-learning/intro-to-ml", "course"),
      T("google-problem-framing", "Google · Framing an ML problem", "https://developers.google.com/machine-learning/problem-framing/ml-framing", "guide"),
      T("microsoft-ml-for-beginners", "Microsoft ML for Beginners · Introduction", "https://github.com/microsoft/ML-For-Beginners/tree/main/1-Introduction/1-intro-to-ML", "course"),
      T("google-ml-crash-course", "Google MLCC · Production ML systems", "https://developers.google.com/machine-learning/crash-course/production-ml-systems", "course") ] },
];

export type ReadingRecommendation = { source: ReferenceSource; kind: ResourceKind };
function routeFor(lesson: Lesson): Route {
  const searchable = `${lesson.slug} ${lesson.tags.join(" ")}`.toLowerCase();
  return routes.find((route) => route.match.test(searchable)) ?? routes[routes.length - 1];
}
export function getReadingShelfCopy(lesson: Lesson, language: Language): ReadingShelfCopy {
  const route = routeFor(lesson); const base = ui[language];
  const titles = { en: `A reading path for ${route.focus.en}`, vi: `Lộ trình đọc sâu: ${route.focus.vi}`, ko: `${route.focus.ko} 심화 읽기 경로` };
  return { ...base, title: titles[language], body: route.purpose[language] };
}
export function getReadingRouteId(lesson: Lesson): string { return routeFor(lesson).id; }
export function getReadingRecommendations(lesson: Lesson, existing: ReferenceId[] = []): ReadingRecommendation[] {
  void existing; // Kept for API compatibility; precise topic routes now supersede broad page references.
  return routeFor(lesson).targets.flatMap((item) => {
    const source = getReference(item.sourceId);
    return source ? [{ source: { ...source, title: item.title, url: item.url }, kind: item.kind }] : [];
  });
}

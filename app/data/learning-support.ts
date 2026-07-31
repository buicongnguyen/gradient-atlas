import type { CurriculumSeed } from "./full-curriculum";
import { supplementalFormulaSupport } from "./supplemental-formulas.ts";

export type LearningLanguage = "en" | "vi" | "ko";

export type TerminologyPair = {
  local: string;
  english: string;
};

export type FormulaSupport = {
  expression: string;
  explanation: Record<LearningLanguage, string>;
  variables?: string[];
};

const vietnameseTerms = {
  accuracy: "độ chính xác",
  activation: "hàm kích hoạt",
  agent: "tác tử",
  algorithm: "thuật toán",
  annotation: "gán nhãn",
  "artificial intelligence": "trí tuệ nhân tạo",
  "backpropagation": "lan truyền ngược",
  baseline: "đường cơ sở",
  batch: "lô dữ liệu",
  bias: "độ chệch",
  classification: "phân loại",
  clustering: "phân cụm",
  coefficient: "hệ số",
  confidence: "độ tin cậy",
  "conditional independence": "độc lập có điều kiện",
  "concept drift": "trôi khái niệm",
  "confusion matrix": "ma trận nhầm lẫn",
  consistency: "tính nhất quán",
  "contrastive learning": "học tương phản",
  "covariate shift": "dịch chuyển hiệp biến",
  "cross-validation": "kiểm định chéo",
  data: "dữ liệu",
  "data leakage": "rò rỉ dữ liệu",
  "decision threshold": "ngưỡng quyết định",
  density: "mật độ",
  "dimensionality reduction": "giảm chiều",
  distribution: "phân phối",
  drift: "độ trôi",
  embeddings: "biểu diễn nhúng",
  encoding: "mã hóa",
  entropy: "entropy",
  environment: "môi trường",
  evaluation: "đánh giá",
  evidence: "bằng chứng",
  features: "đặc trưng",
  "feature selection": "lựa chọn đặc trưng",
  "false negative": "âm tính giả",
  "false positive": "dương tính giả",
  generalization: "khái quát hóa",
  gradient: "gradient",
  "gradient descent": "hạ gradient",
  hypothesis: "giả thuyết",
  inference: "suy luận",
  label: "nhãn",
  labels: "nhãn",
  latency: "độ trễ",
  learning: "học",
  likelihood: "hàm khả năng",
  loss: "hàm mất mát",
  "machine learning": "học máy",
  margin: "biên",
  metric: "chỉ số",
  monitoring: "giám sát",
  objective: "hàm mục tiêu",
  optimization: "tối ưu hóa",
  outlier: "điểm ngoại lai",
  overfitting: "quá khớp",
  parameters: "tham số",
  policy: "chính sách",
  precision: "độ chuẩn xác",
  prediction: "dự đoán",
  prevalence: "tỷ lệ hiện mắc",
  probability: "xác suất",
  recall: "độ bao phủ",
  regression: "hồi quy",
  regularization: "điều chuẩn",
  representation: "biểu diễn",
  residual: "phần dư",
  reward: "phần thưởng",
  sampling: "lấy mẫu",
  scaling: "co giãn",
  sparsity: "tính thưa",
  standardization: "chuẩn hóa",
  support: "độ hỗ trợ",
  "support vectors": "vector hỗ trợ",
  target: "biến mục tiêu",
  threshold: "ngưỡng",
  training: "huấn luyện",
  transformer: "mô hình Transformer",
  uncertainty: "độ bất định",
  underfitting: "thiếu khớp",
  validation: "thẩm định",
  variance: "phương sai",
} as const satisfies Record<string, string>;

const koreanTerms: Record<keyof typeof vietnameseTerms, string> = {
  accuracy: "정확도",
  activation: "활성함수",
  agent: "에이전트",
  algorithm: "알고리즘",
  annotation: "레이블링",
  "artificial intelligence": "인공지능",
  backpropagation: "역전파",
  baseline: "기준선",
  batch: "배치",
  bias: "편향",
  classification: "분류",
  clustering: "군집화",
  coefficient: "계수",
  confidence: "신뢰도",
  "conditional independence": "조건부 독립",
  "concept drift": "개념 드리프트",
  "confusion matrix": "혼동행렬",
  consistency: "일관성",
  "contrastive learning": "대조학습",
  "covariate shift": "공변량 이동",
  "cross-validation": "교차검증",
  data: "데이터",
  "data leakage": "데이터 누수",
  "decision threshold": "결정 임곗값",
  density: "밀도",
  "dimensionality reduction": "차원 축소",
  distribution: "분포",
  drift: "드리프트",
  embeddings: "임베딩",
  encoding: "인코딩",
  entropy: "엔트로피",
  environment: "환경",
  evaluation: "평가",
  evidence: "근거",
  features: "특징",
  "feature selection": "특징 선택",
  "false negative": "거짓 음성",
  "false positive": "거짓 양성",
  generalization: "일반화",
  gradient: "기울기",
  "gradient descent": "경사하강법",
  hypothesis: "가설",
  inference: "추론",
  label: "레이블",
  labels: "레이블",
  latency: "지연 시간",
  learning: "학습",
  likelihood: "우도",
  loss: "손실",
  "machine learning": "머신러닝",
  margin: "마진",
  metric: "평가 지표",
  monitoring: "모니터링",
  objective: "목적함수",
  optimization: "최적화",
  outlier: "이상치",
  overfitting: "과적합",
  parameters: "매개변수",
  policy: "정책",
  precision: "정밀도",
  prediction: "예측",
  prevalence: "발생 비율",
  probability: "확률",
  recall: "재현율",
  regression: "회귀",
  regularization: "정규화",
  representation: "표현",
  residual: "잔차",
  reward: "보상",
  sampling: "표본추출",
  scaling: "스케일링",
  sparsity: "희소성",
  standardization: "표준화",
  support: "지지도",
  "support vectors": "서포트 벡터",
  target: "타깃",
  threshold: "임곗값",
  training: "학습",
  transformer: "트랜스포머",
  uncertainty: "불확실성",
  underfitting: "과소적합",
  validation: "검증",
  variance: "분산",
};

function normalizedTerm(term: string) {
  return term.trim().toLocaleLowerCase("en");
}

export function vietnameseTerminology(seed: CurriculumSeed): TerminologyPair[] {
  return localizedTerminology("vi", seed);
}

export function localizedTerminology(
  language: LearningLanguage,
  seed: CurriculumSeed,
): TerminologyPair[] {
  const locale = language === "ko" ? "ko" : language === "vi" ? "vi" : "en";
  const pairs: TerminologyPair[] = [
    {
      local: seed.titles[language],
      english: seed.titles.en,
    },
  ];

  for (const tag of seed.tags) {
    const normalized = normalizedTerm(tag) as keyof typeof vietnameseTerms;
    if (!(normalized in vietnameseTerms)) continue;
    const local =
      language === "vi"
        ? vietnameseTerms[normalized]
        : language === "ko"
          ? koreanTerms[normalized]
          : tag;
    if (!local) continue;
    if (
      pairs.some(
        (pair) =>
          pair.english.toLocaleLowerCase("en") === tag.toLocaleLowerCase("en") ||
          pair.local.toLocaleLowerCase(locale) === local.toLocaleLowerCase(locale),
      )
    ) {
      continue;
    }
    pairs.push({ local, english: tag });
    if (pairs.length === 4) break;
  }

  return pairs;
}

const explanations = (
  en: string,
  vi: string,
  ko: string,
): Record<LearningLanguage, string> => ({ en, vi, ko });

export const formulaSupportBySlug: Record<string, FormulaSupport> = {
  "supervised-learning": {
    expression: "θ* = arg min_θ (1/n) Σᵢ L(f_θ(xᵢ), yᵢ)",
    explanation: explanations(
      "Supervised learning chooses parameters that minimize average loss on labeled examples.",
      "Học có giám sát chọn tham số làm nhỏ nhất mất mát trung bình trên các ví dụ có nhãn.",
      "지도학습은 레이블이 있는 예제의 평균 손실을 최소화하는 매개변수를 찾습니다.",
    ),
    variables: ["xᵢ: input", "yᵢ: label", "f_θ: model", "L: loss", "n: sample count"],
  },
  "semi-supervised-learning": {
    expression: "L_total = L_labeled + λ L_unlabeled",
    explanation: explanations(
      "A weighting factor balances supervised evidence and the consistency signal from unlabeled data.",
      "Hệ số λ cân bằng bằng chứng có nhãn và tín hiệu nhất quán từ dữ liệu chưa gán nhãn.",
      "λ는 레이블 데이터의 증거와 비레이블 데이터의 일관성 신호 사이의 균형을 정합니다.",
    ),
    variables: ["λ: consistency weight"],
  },
  "reinforcement-learning": {
    expression: "Gₜ = Σₖ₌₀^∞ γᵏ rₜ₊ₖ₊₁",
    explanation: explanations(
      "The return is the discounted sum of future rewards from time t.",
      "Lợi tức là tổng phần thưởng tương lai có chiết khấu tính từ thời điểm t.",
      "수익은 시점 t부터 미래 보상을 할인해 더한 값입니다.",
    ),
    variables: ["r: reward", "γ ∈ [0,1): discount factor"],
  },
  "ensemble-learning": {
    expression: "ŷ = Σₘ wₘ fₘ(x),   Σₘ wₘ = 1",
    explanation: explanations(
      "A weighted ensemble combines model predictions while keeping the weights normalized.",
      "Mô hình tổ hợp có trọng số kết hợp các dự đoán và chuẩn hóa tổng trọng số bằng 1.",
      "가중 앙상블은 정규화된 가중치로 여러 모델의 예측을 결합합니다.",
    ),
    variables: ["fₘ: component model", "wₘ: model weight"],
  },
  clustering: {
    expression: "J = Σᵢ ‖xᵢ − μ_{cᵢ}‖²",
    explanation: explanations(
      "The k-means objective measures squared distance from each point to its assigned centroid.",
      "Mục tiêu k-means đo bình phương khoảng cách từ mỗi điểm đến tâm cụm được gán.",
      "k-평균 목적함수는 각 점과 할당된 중심 사이의 거리 제곱을 측정합니다.",
    ),
    variables: ["μ: centroid", "cᵢ: cluster assignment"],
  },
  "dimensionality-reduction-and-metric-learning": {
    expression: "z = Wᵀx,   WᵀW = I",
    explanation: explanations(
      "A linear projection maps x to a lower-dimensional coordinate z using an orthonormal basis.",
      "Phép chiếu tuyến tính ánh xạ x sang tọa độ z có số chiều thấp hơn bằng một cơ sở trực chuẩn.",
      "선형 투영은 직교정규 기저를 사용해 x를 저차원 좌표 z로 옮깁니다.",
    ),
    variables: ["W: projection basis", "z: reduced representation"],
  },
  "self-supervised-learning": {
    expression: "L = −log [ exp(sim(zᵢ,zⱼ)/τ) / Σₖ exp(sim(zᵢ,zₖ)/τ) ]",
    explanation: explanations(
      "A contrastive objective pulls a positive pair together relative to alternative examples.",
      "Mục tiêu tương phản kéo một cặp dương lại gần nhau so với các ví dụ thay thế.",
      "대조 목적함수는 양성 쌍을 다른 예제보다 가깝게 만듭니다.",
    ),
    variables: ["sim: similarity", "τ: temperature"],
  },
  "sparse-dictionary-learning": {
    expression: "min_{D,α} ‖X − Dα‖²_F + λ‖α‖₁",
    explanation: explanations(
      "Dictionary learning balances reconstruction error against a sparse coefficient penalty.",
      "Học từ điển cân bằng sai số tái tạo với hình phạt làm thưa các hệ số.",
      "사전학습은 재구성 오차와 희소 계수 패널티의 균형을 맞춥니다.",
    ),
    variables: ["D: dictionary", "α: sparse coefficients", "λ: penalty strength"],
  },
  "association-rule-learning": {
    expression: "confidence(A→B) = support(A∩B) / support(A)",
    explanation: explanations(
      "Rule confidence is the observed conditional frequency of B among cases containing A.",
      "Độ tin cậy của luật là tần suất có điều kiện quan sát được của B trong các trường hợp chứa A.",
      "규칙 신뢰도는 A가 있는 사례 중 B도 있는 관측 조건부 빈도입니다.",
    ),
    variables: ["support: observed frequency"],
  },
  "artificial-neural-networks": {
    expression: "a⁽ˡ⁾ = φ(W⁽ˡ⁾a⁽ˡ⁻¹⁾ + b⁽ˡ⁾)",
    explanation: explanations(
      "Each neural-network layer applies an affine transformation followed by an activation.",
      "Mỗi lớp mạng nơ-ron thực hiện biến đổi affine rồi áp dụng hàm kích hoạt.",
      "신경망의 각 층은 아핀 변환 뒤 활성함수를 적용합니다.",
    ),
    variables: ["W: weights", "b: bias", "φ: activation"],
  },
  "graph-machine-learning": {
    expression: "hᵥ′ = UPDATE(hᵥ, AGGREGATE({hᵤ : u ∈ N(v)}))",
    explanation: explanations(
      "Message passing updates a node from its current state and aggregated neighbor states.",
      "Truyền thông điệp cập nhật một nút từ trạng thái hiện tại và trạng thái tổng hợp của các nút lân cận.",
      "메시지 전달은 현재 노드 상태와 이웃 상태의 집계로 노드를 갱신합니다.",
    ),
    variables: ["N(v): neighbors of v", "hᵥ: node representation"],
  },
  "decision-trees": {
    expression: "IG = H(parent) − Σⱼ (nⱼ/n) H(childⱼ)",
    explanation: explanations(
      "Information gain measures how much a split reduces weighted impurity.",
      "Độ lợi thông tin đo mức một phép chia làm giảm độ hỗn tạp có trọng số.",
      "정보 이득은 분할이 가중 불순도를 얼마나 줄이는지 측정합니다.",
    ),
    variables: ["H: impurity or entropy", "nⱼ: child sample count"],
  },
  "support-vector-machines": {
    expression: "min_{w,b} ½‖w‖² + C Σᵢ max(0, 1 − yᵢ(wᵀxᵢ+b))",
    explanation: explanations(
      "The soft-margin objective trades a wide margin against hinge-loss violations.",
      "Mục tiêu biên mềm đánh đổi giữa biên rộng và các vi phạm được đo bằng hinge loss.",
      "소프트 마진 목적함수는 넓은 마진과 힌지 손실 위반 사이를 절충합니다.",
    ),
    variables: ["C: violation cost", "w,b: decision boundary"],
  },
  "linear-regression": {
    expression: "ŷ = β₀ + Σⱼ βⱼxⱼ,   MSE = (1/n)Σᵢ(yᵢ−ŷᵢ)²",
    explanation: explanations(
      "Linear regression predicts an additive response and commonly fits it by mean squared error.",
      "Hồi quy tuyến tính dự đoán đáp ứng cộng tính và thường khớp mô hình bằng sai số bình phương trung bình.",
      "선형회귀는 가산적 반응을 예측하며 보통 평균제곱오차로 적합합니다.",
    ),
    variables: ["β: coefficients", "ŷ: prediction"],
  },
  "logistic-regression": {
    expression: "P(y=1|x) = σ(wᵀx+b) = 1 / (1+e^{−(wᵀx+b)})",
    explanation: explanations(
      "The sigmoid maps a linear score to a value between zero and one.",
      "Hàm sigmoid ánh xạ điểm tuyến tính thành một giá trị nằm giữa 0 và 1.",
      "시그모이드는 선형 점수를 0과 1 사이의 값으로 변환합니다.",
    ),
    variables: ["σ: sigmoid", "w,b: model parameters"],
  },
  "bayesian-networks": {
    expression: "P(x₁,…,xₙ) = ∏ᵢ P(xᵢ | parents(xᵢ))",
    explanation: explanations(
      "A Bayesian network factorizes a joint distribution according to parent relationships in a DAG.",
      "Mạng Bayes phân rã phân phối đồng thời theo quan hệ cha trong đồ thị có hướng không chu trình.",
      "베이지안 네트워크는 DAG의 부모 관계에 따라 결합분포를 분해합니다.",
    ),
    variables: ["DAG: directed acyclic graph"],
  },
  "gaussian-processes": {
    expression: "f(x) ~ GP(m(x), k(x,x′))",
    explanation: explanations(
      "A Gaussian process defines a distribution over functions through a mean and covariance kernel.",
      "Quá trình Gaussian định nghĩa một phân phối trên các hàm bằng hàm trung bình và kernel hiệp phương sai.",
      "가우시안 프로세스는 평균함수와 공분산 커널로 함수의 분포를 정의합니다.",
    ),
    variables: ["m: mean function", "k: covariance kernel"],
  },
  "probabilistic-graphical-models": {
    expression: "P(x) = (1/Z) ∏ₐ ψₐ(xₐ)",
    explanation: explanations(
      "A factor graph represents a joint distribution as normalized local compatibility functions.",
      "Đồ thị thừa số biểu diễn phân phối đồng thời bằng các hàm tương thích cục bộ đã chuẩn hóa.",
      "요인 그래프는 정규화된 국소 호환성 함수의 곱으로 결합분포를 나타냅니다.",
    ),
    variables: ["ψₐ: factor potential", "Z: normalizing constant"],
  },
  perceptron: {
    expression: "w ← w + η yᵢxᵢ   when yᵢ(wᵀxᵢ) ≤ 0",
    explanation: explanations(
      "The perceptron changes its weights only when an example is misclassified or lies on the boundary.",
      "Perceptron chỉ cập nhật trọng số khi một ví dụ bị phân loại sai hoặc nằm trên biên.",
      "퍼셉트론은 예제가 오분류되거나 경계에 있을 때만 가중치를 갱신합니다.",
    ),
    variables: ["η: learning rate"],
  },
  "naive-bayes-classifier": {
    expression: "P(y|x₁,…,x_d) ∝ P(y) ∏ⱼ P(xⱼ|y)",
    explanation: explanations(
      "Naive Bayes combines a class prior with conditionally independent feature likelihoods.",
      "Naive Bayes kết hợp tiên nghiệm của lớp với các hàm khả năng đặc trưng độc lập có điều kiện.",
      "나이브 베이즈는 클래스 사전확률과 조건부 독립 특징 우도를 결합합니다.",
    ),
    variables: ["P(y): class prior", "P(xⱼ|y): feature likelihood"],
  },
  "learning-probabilistic-models": {
    expression: "θ_MLE = arg max_θ Σᵢ log p(xᵢ|θ)",
    explanation: explanations(
      "Maximum likelihood chooses parameters that make the observed data most probable under the model.",
      "Ước lượng hợp lý cực đại chọn tham số làm dữ liệu quan sát có xác suất lớn nhất dưới mô hình.",
      "최대우도추정은 관측 데이터의 모델 확률을 가장 크게 만드는 매개변수를 고릅니다.",
    ),
    variables: ["θ: model parameters", "p(x|θ): likelihood"],
  },
  "data-normalization": {
    expression: "z = (x − μ) / σ",
    explanation: explanations(
      "Standardization centers a feature by its mean and scales it by its standard deviation.",
      "Chuẩn hóa tâm hóa đặc trưng theo trung bình và co giãn theo độ lệch chuẩn.",
      "표준화는 평균으로 중심을 맞추고 표준편차로 크기를 조정합니다.",
    ),
    variables: ["μ: mean", "σ: standard deviation"],
  },
  "cross-validation": {
    expression: "CV score = (1/K) Σₖ metricₖ",
    explanation: explanations(
      "K-fold cross-validation averages validation evidence across K held-out folds.",
      "Kiểm định chéo K-fold lấy trung bình bằng chứng thẩm định trên K fold được giữ lại.",
      "K-겹 교차검증은 K개의 홀드아웃 폴드에서 검증 근거를 평균합니다.",
    ),
    variables: ["K: number of folds"],
  },
  "hyperparameter-tuning": {
    expression: "λ* = arg max_{λ∈Λ} score_validation(λ)",
    explanation: explanations(
      "Hyperparameters are selected using validation evidence, not the final test set.",
      "Siêu tham số được chọn bằng bằng chứng thẩm định, không phải bằng tập kiểm thử cuối cùng.",
      "하이퍼파라미터는 최종 테스트셋이 아니라 검증 근거로 선택합니다.",
    ),
    variables: ["Λ: search space", "λ: candidate configuration"],
  },
  "training-loop": {
    expression: "θₜ₊₁ = θₜ − η ∇_θ L(θₜ)",
    explanation: explanations(
      "Gradient descent updates parameters in the direction that locally reduces the loss.",
      "Hạ gradient cập nhật tham số theo hướng làm giảm cục bộ hàm mất mát.",
      "경사하강법은 손실을 국소적으로 줄이는 방향으로 매개변수를 갱신합니다.",
    ),
    variables: ["η: learning rate", "∇L: loss gradient"],
  },
  "classification-metrics": {
    expression: "precision = TP/(TP+FP),   recall = TP/(TP+FN),   F1 = 2PR/(P+R)",
    explanation: explanations(
      "Precision, recall, and F1 summarize different consequences of binary classification errors.",
      "Precision, recall và F1 tóm tắt các hậu quả khác nhau của lỗi phân loại nhị phân.",
      "정밀도, 재현율, F1은 이진 분류 오류의 서로 다른 결과를 요약합니다.",
    ),
    variables: ["TP: true positive", "FP: false positive", "FN: false negative"],
  },
  "confusion-matrix": {
    expression: "N = TP + FP + TN + FN",
    explanation: explanations(
      "Every evaluated binary prediction belongs to exactly one cell of the confusion matrix.",
      "Mỗi dự đoán nhị phân được đánh giá thuộc đúng một ô của ma trận nhầm lẫn.",
      "평가된 모든 이진 예측은 혼동행렬의 한 칸에만 속합니다.",
    ),
    variables: ["N: evaluated sample count"],
  },
  "roc-auc": {
    expression: "TPR = TP/(TP+FN),   FPR = FP/(FP+TN)",
    explanation: explanations(
      "An ROC curve traces true-positive and false-positive rates as the threshold changes.",
      "Đường ROC theo dõi tỷ lệ dương tính thật và dương tính giả khi ngưỡng thay đổi.",
      "ROC 곡선은 임곗값에 따른 참양성률과 거짓양성률을 추적합니다.",
    ),
    variables: ["TPR: true-positive rate", "FPR: false-positive rate"],
  },
  "regression-metrics": {
    expression: "MAE = (1/n)Σᵢ|yᵢ−ŷᵢ|,   RMSE = √[(1/n)Σᵢ(yᵢ−ŷᵢ)²]",
    explanation: explanations(
      "MAE weights errors linearly, while RMSE gives larger residuals more influence.",
      "MAE gán trọng số tuyến tính cho sai số, còn RMSE làm phần dư lớn có ảnh hưởng mạnh hơn.",
      "MAE는 오차를 선형으로 반영하고 RMSE는 큰 잔차에 더 큰 영향을 줍니다.",
    ),
    variables: ["y: observed target", "ŷ: prediction"],
  },
  "ranking-metrics": {
    expression: "DCG@k = Σᵢ₌₁^k (2^{relᵢ}−1) / log₂(i+1)",
    explanation: explanations(
      "Discounted cumulative gain rewards relevant items more when they appear near the top of a ranking.",
      "Độ lợi tích lũy chiết khấu thưởng nhiều hơn cho mục liên quan xuất hiện gần đầu bảng xếp hạng.",
      "할인누적이득은 관련 항목이 순위 상단에 있을수록 더 크게 보상합니다.",
    ),
    variables: ["relᵢ: relevance at rank i", "k: cutoff"],
  },
  "bias-and-variance": {
    expression: "E[(y−f̂(x))²] = bias² + variance + noise",
    explanation: explanations(
      "Expected prediction error can be analyzed as systematic error, sample sensitivity, and irreducible noise.",
      "Sai số dự đoán kỳ vọng có thể được phân tích thành sai lệch hệ thống, độ nhạy theo mẫu và nhiễu không thể loại bỏ.",
      "기대 예측오차는 체계적 오차, 표본 민감도, 제거 불가능한 잡음으로 분석할 수 있습니다.",
    ),
    variables: ["bias: systematic error", "variance: sample sensitivity"],
  },
  "regularization-review": {
    expression: "J(θ) = L_data(θ) + λ Ω(θ)",
    explanation: explanations(
      "Regularized training balances data fit against a stated preference encoded by the penalty.",
      "Huấn luyện có điều chuẩn cân bằng độ khớp dữ liệu với một ưu tiên được mã hóa bằng hình phạt.",
      "정규화 학습은 데이터 적합도와 패널티로 표현한 선호의 균형을 맞춥니다.",
    ),
    variables: ["Ω: penalty", "λ: regularization strength"],
  },
  "distribution-shift": {
    expression: "P_train(X,Y) ≠ P_production(X,Y)",
    explanation: explanations(
      "Distribution shift means the production-generating process differs from the process represented by training data.",
      "Dịch chuyển phân phối nghĩa là quá trình sinh dữ liệu vận hành khác với quá trình được biểu diễn trong dữ liệu huấn luyện.",
      "분포 이동은 운영 데이터 생성 과정이 학습 데이터가 나타낸 과정과 다르다는 뜻입니다.",
    ),
    variables: ["P_train: training distribution", "P_production: production distribution"],
  },
  ...supplementalFormulaSupport,
};

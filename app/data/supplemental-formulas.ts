import type { FormulaSupport, LearningLanguage } from "./learning-support";

const explanations = (
  en: string,
  vi: string,
  ko: string,
): Record<LearningLanguage, string> => ({ en, vi, ko });

export const supplementalFormulaSupport: Record<string, FormulaSupport> = {
  "introduction-to-machine-learning": {
    expression: "θ* = arg min_θ (1/n) Σᵢ L(f_θ(xᵢ), yᵢ)",
    explanation: explanations(
      "Empirical risk minimization chooses model parameters by averaging loss over observed examples.",
      "Tối thiểu hóa rủi ro thực nghiệm chọn tham số mô hình bằng cách lấy trung bình mất mát trên các ví dụ đã quan sát.",
      "경험적 위험 최소화는 관측 예제의 평균 손실을 기준으로 모델 매개변수를 선택합니다.",
    ),
    variables: ["θ: model parameters", "L: loss", "n: sample count"],
  },
  "unsupervised-learning": {
    expression: "θ* = arg min_θ Σᵢ L_unsup(xᵢ; θ)",
    explanation: explanations(
      "An unsupervised objective learns structure from inputs without requiring a provided target for every example.",
      "Mục tiêu không giám sát học cấu trúc từ đầu vào mà không cần nhãn mục tiêu cho từng ví dụ.",
      "비지도 목적함수는 각 예제의 정답 레이블 없이 입력에서 구조를 학습합니다.",
    ),
    variables: ["xᵢ: input", "L_unsup: unsupervised objective"],
  },
  "feature-learning": {
    expression: "z = g_φ(x),   x̂ = d_ψ(z),   min_{φ,ψ} Σᵢ ‖xᵢ−x̂ᵢ‖²",
    explanation: explanations(
      "An encoder creates a representation z; a reconstruction objective is one way to require that representation to preserve useful information.",
      "Bộ mã hóa tạo biểu diễn z; mục tiêu tái tạo là một cách buộc biểu diễn giữ lại thông tin hữu ích.",
      "인코더는 표현 z를 만들며, 재구성 목적함수는 그 표현이 유용한 정보를 보존하도록 하는 한 가지 방법입니다.",
    ),
    variables: ["g_φ: encoder", "d_ψ: decoder", "z: learned representation"],
  },
  "anomaly-detection": {
    expression: "anomaly(x) = 𝟙[s(x) > τ]",
    explanation: explanations(
      "An anomaly score becomes an operational alert only after selecting a threshold τ.",
      "Điểm bất thường chỉ trở thành cảnh báo vận hành sau khi chọn ngưỡng τ.",
      "이상 점수는 임곗값 τ를 정한 뒤에야 운영 경보가 됩니다.",
    ),
    variables: ["s(x): anomaly score", "τ: alert threshold", "𝟙: indicator"],
  },
  "robot-learning": {
    expression: "aₜ ~ π_θ(a|sₜ),   sₜ₊₁ ~ P(s′|sₜ,aₜ)",
    explanation: explanations(
      "Robot learning couples a policy that selects actions with environment dynamics that produce the next state.",
      "Học cho robot nối chính sách chọn hành động với động lực môi trường tạo ra trạng thái kế tiếp.",
      "로봇 학습은 행동을 선택하는 정책과 다음 상태를 만드는 환경 동역학을 연결합니다.",
    ),
    variables: ["π_θ: policy", "sₜ: state", "aₜ: action", "P: transition model"],
  },
  "regression-analysis": {
    expression: "yᵢ = f(xᵢ) + εᵢ,   E[εᵢ | xᵢ] = 0",
    explanation: explanations(
      "Regression separates a systematic response f(x) from residual variation ε under an explicit conditional-mean assumption.",
      "Hồi quy tách đáp ứng có hệ thống f(x) khỏi biến thiên phần dư ε dưới một giả định rõ ràng về trung bình có điều kiện.",
      "회귀는 조건부 평균 가정 아래 체계적 반응 f(x)와 잔차 변동 ε를 구분합니다.",
    ),
    variables: ["f(x): fitted response", "ε: residual"],
  },
  "genetic-algorithms": {
    expression: "p(select i) = Fᵢ / Σⱼ Fⱼ",
    explanation: explanations(
      "Fitness-proportionate selection samples candidates according to their relative fitness, though other selection rules are also possible.",
      "Chọn theo tỷ lệ thích nghi lấy mẫu ứng viên dựa trên độ thích nghi tương đối, dù còn nhiều quy tắc chọn khác.",
      "적합도 비례 선택은 상대 적합도에 따라 후보를 표본화하며, 다른 선택 규칙도 사용할 수 있습니다.",
    ),
    variables: ["Fᵢ: fitness of candidate i", "p: selection probability"],
  },
  "relevance-vector-machine": {
    expression: "y(x) = Σⱼ wⱼ K(x,xⱼ) + ε,   wⱼ ~ N(0, αⱼ⁻¹)",
    explanation: explanations(
      "A relevance vector machine combines kernel basis functions with individual sparse Bayesian priors on their weights.",
      "Máy vector liên quan kết hợp các hàm cơ sở kernel với tiên nghiệm Bayes thưa riêng cho từng trọng số.",
      "관련 벡터 머신은 커널 기저함수와 각 가중치에 대한 희소 베이지안 사전분포를 결합합니다.",
    ),
    variables: ["K: kernel", "wⱼ: basis weight", "αⱼ: prior precision"],
  },
  "what-machine-learning-learns": {
    expression: "f* = arg min_{f∈ℱ} E_{(x,y)~P}[L(f(x),y)]",
    explanation: explanations(
      "Learning searches a hypothesis class for a rule with low expected loss under the data-generating distribution.",
      "Quá trình học tìm trong lớp giả thuyết một quy tắc có mất mát kỳ vọng thấp dưới phân phối sinh dữ liệu.",
      "학습은 가설 집합에서 데이터 생성분포에 대한 기대 손실이 낮은 규칙을 찾습니다.",
    ),
    variables: ["ℱ: hypothesis class", "P: data distribution", "L: loss"],
  },
  "model-vs-algorithm": {
    expression: "θ* = A(D),   prediction = f_{θ*}(x)",
    explanation: explanations(
      "The algorithm A uses data D to produce parameters; the resulting model f uses those parameters to make predictions.",
      "Thuật toán A dùng dữ liệu D để tạo tham số; mô hình f sau đó dùng các tham số ấy để dự đoán.",
      "알고리즘 A는 데이터 D에서 매개변수를 만들고, 완성된 모델 f는 그 매개변수로 예측합니다.",
    ),
    variables: ["A: training algorithm", "D: training data", "f_θ: model"],
  },
  "parametric-vs-nonparametric": {
    expression: "parametric: dim(θ)=k;   non-parametric: k=k(n)",
    explanation: explanations(
      "A parametric model keeps a fixed-dimensional parameterization, while many non-parametric methods can increase effective capacity with sample size.",
      "Mô hình tham số giữ số chiều tham số cố định, còn nhiều phương pháp phi tham số có thể tăng dung lượng hiệu dụng theo kích thước mẫu.",
      "모수 모델은 고정 차원의 매개변수화를 유지하지만, 많은 비모수 방법은 표본 수에 따라 유효 용량이 커질 수 있습니다.",
    ),
    variables: ["k: effective parameter count", "n: sample count"],
  },
  "training-process-overview": {
    expression: "θₜ₊₁ = θₜ − ηₜ ∇_θ L_batch(θₜ)",
    explanation: explanations(
      "A training iteration evaluates a batch loss and updates parameters using its gradient and a learning rate.",
      "Một vòng huấn luyện tính mất mát trên lô rồi cập nhật tham số bằng gradient và tốc độ học.",
      "한 번의 학습 반복은 배치 손실을 계산하고 기울기와 학습률로 매개변수를 갱신합니다.",
    ),
    variables: ["ηₜ: learning rate", "L_batch: batch loss"],
  },
  "ml-problem-formulation": {
    expression: "f: X → Y,   θ* = arg min_θ [R̂(θ) + λΩ(θ)]",
    explanation: explanations(
      "Problem formulation specifies the input and output spaces, the empirical risk, and any regularizing preference.",
      "Định hình bài toán xác định không gian đầu vào, đầu ra, rủi ro thực nghiệm và ưu tiên điều chuẩn.",
      "문제 정식화는 입력·출력 공간, 경험적 위험, 정규화 선호를 명시합니다.",
    ),
    variables: ["X: input space", "Y: output space", "R̂: empirical risk", "Ω: regularizer"],
  },
  "real-world-ml-examples": {
    expression: "a*(x) = arg min_{a∈A} Σ_y C(a,y) P(y|x)",
    explanation: explanations(
      "A useful prediction supports an action that minimizes expected real-world cost, not merely model error.",
      "Dự đoán hữu ích hỗ trợ hành động làm nhỏ nhất chi phí thực tế kỳ vọng, không chỉ làm nhỏ lỗi mô hình.",
      "유용한 예측은 단순한 모델 오차가 아니라 기대 현실 비용을 최소화하는 행동을 지원합니다.",
    ),
    variables: ["a: action", "C(a,y): action cost", "P(y|x): predictive probability"],
  },
  "what-is-data": {
    expression: "P̂ₙ = (1/n) Σᵢ δ_{xᵢ}",
    explanation: explanations(
      "The empirical distribution assigns equal mass to observed samples; it reflects the collection process, not every possible case.",
      "Phân phối thực nghiệm gán khối lượng bằng nhau cho các mẫu đã quan sát; nó phản ánh quá trình thu thập chứ không phải mọi trường hợp có thể xảy ra.",
      "경험분포는 관측 표본에 같은 질량을 부여하며, 가능한 모든 사례가 아니라 수집 과정을 반영합니다.",
    ),
    variables: ["δ_{xᵢ}: point mass at xᵢ", "n: sample count"],
  },
  "feature-engineering": {
    expression: "z = T_fit(D_train)(x)",
    explanation: explanations(
      "A feature transformation is fitted on training data and then applied unchanged to validation, test, and production inputs.",
      "Phép biến đổi đặc trưng được khớp trên dữ liệu huấn luyện rồi áp dụng không đổi cho dữ liệu thẩm định, kiểm thử và vận hành.",
      "특징 변환은 학습 데이터에서 적합한 뒤 검증·테스트·운영 입력에 그대로 적용합니다.",
    ),
    variables: ["T: fitted transformation", "z: engineered feature", "D_train: training data"],
  },
  "label-definition": {
    expression: "η = P(ỹ ≠ y)",
    explanation: explanations(
      "A label-noise rate distinguishes the recorded proxy ỹ from the underlying target y.",
      "Tỷ lệ nhiễu nhãn phân biệt nhãn đại diện đã ghi ỹ với mục tiêu nền y.",
      "레이블 잡음률은 기록된 대리 레이블 ỹ와 실제 목표 y의 차이를 나타냅니다.",
    ),
    variables: ["ỹ: recorded label", "y: underlying target", "η: label-noise rate"],
  },
  "data-collection": {
    expression: "SE(x̄) = s / √n",
    explanation: explanations(
      "For independent observations, uncertainty in a sample mean decreases with the square root of sample size, not linearly.",
      "Với các quan sát độc lập, độ bất định của trung bình mẫu giảm theo căn bậc hai của kích thước mẫu, không giảm tuyến tính.",
      "독립 관측에서 표본평균의 불확실성은 표본 수에 선형이 아니라 제곱근 비율로 감소합니다.",
    ),
    variables: ["s: sample standard deviation", "n: sample count", "SE: standard error"],
  },
  "data-cleaning": {
    expression: "missing_rateⱼ = (1/n) Σᵢ 𝟙[xᵢⱼ is missing]",
    explanation: explanations(
      "A per-feature missing rate is a basic measurement; its pattern and cause matter more than a single global count.",
      "Tỷ lệ thiếu theo từng đặc trưng là phép đo cơ bản; kiểu thiếu và nguyên nhân quan trọng hơn một tổng số toàn cục.",
      "특징별 결측률은 기본 측정값이며, 하나의 전체 개수보다 결측 패턴과 원인이 더 중요합니다.",
    ),
    variables: ["xᵢⱼ: feature j for sample i", "𝟙: indicator", "n: sample count"],
  },
  "feature-selection": {
    expression: "w* = arg min_w [L(w) + λ‖w‖₁]",
    explanation: explanations(
      "An L1 penalty can drive some coefficients to zero, coupling prediction with embedded feature selection.",
      "Phạt L1 có thể đưa một số hệ số về 0, qua đó kết hợp dự đoán với lựa chọn đặc trưng nhúng.",
      "L1 패널티는 일부 계수를 0으로 만들어 예측과 내장형 특징 선택을 연결할 수 있습니다.",
    ),
    variables: ["w: feature weights", "λ: selection strength", "L: predictive loss"],
  },
  "data-visualization": {
    expression: "r = Σᵢ(xᵢ−x̄)(yᵢ−ȳ) / √[Σᵢ(xᵢ−x̄)² Σᵢ(yᵢ−ȳ)²]",
    explanation: explanations(
      "Pearson correlation summarizes linear association, but a plot is needed to reveal curvature, clusters, and influential points.",
      "Tương quan Pearson tóm tắt liên hệ tuyến tính, nhưng vẫn cần biểu đồ để thấy độ cong, cụm và điểm có ảnh hưởng mạnh.",
      "피어슨 상관계수는 선형 연관성을 요약하지만, 곡선·군집·영향점은 시각화해야 드러납니다.",
    ),
    variables: ["r: correlation", "x̄,ȳ: sample means"],
  },
  "data-leakage": {
    expression: "usable(xⱼ) ⇔ time_available(xⱼ) ≤ time_decision",
    explanation: explanations(
      "A feature is legitimate only when it is available no later than the real decision time.",
      "Một đặc trưng chỉ hợp lệ khi có sẵn không muộn hơn thời điểm ra quyết định thực tế.",
      "특징은 실제 의사결정 시점보다 늦지 않게 이용할 수 있을 때만 정당합니다.",
    ),
    variables: ["xⱼ: candidate feature", "time_decision: prediction time"],
  },
  "train-validation-and-test": {
    expression: "D = D_train ⊔ D_val ⊔ D_test,   pairwise intersections = ∅",
    explanation: explanations(
      "Training, validation, and test partitions must be disjoint so fitting, selection, and final evidence remain separate.",
      "Các phần huấn luyện, thẩm định và kiểm thử phải rời nhau để việc khớp, lựa chọn và bằng chứng cuối cùng được tách biệt.",
      "학습·검증·테스트 파티션은 서로 겹치지 않아야 적합, 선택, 최종 근거가 분리됩니다.",
    ),
    variables: ["⊔: disjoint union", "∅: empty intersection"],
  },
  "data-splitting": {
    expression: "n_train + n_val + n_test = n,   n_train/n + n_val/n + n_test/n = 1",
    explanation: explanations(
      "Split sizes partition the available sample; the grouping or time rule is as important as the proportions.",
      "Kích thước các phần chia phân hoạch toàn bộ mẫu; quy tắc theo nhóm hoặc thời gian quan trọng không kém tỷ lệ.",
      "분할 크기는 전체 표본을 나누며, 그룹·시간 규칙은 비율만큼 중요합니다.",
    ),
    variables: ["n: total sample count", "n_train,n_val,n_test: partition sizes"],
  },
  "why-validation": {
    expression: "λ* = arg min_{λ∈Λ} L_val(f_{θ*(λ)})",
    explanation: explanations(
      "Validation data selects a configuration after each candidate has been fitted only on training data.",
      "Dữ liệu thẩm định chọn cấu hình sau khi từng ứng viên chỉ được khớp trên dữ liệu huấn luyện.",
      "검증 데이터는 각 후보를 학습 데이터에만 적합한 뒤 설정을 선택합니다.",
    ),
    variables: ["λ: configuration", "θ*(λ): fitted parameters", "L_val: validation loss"],
  },
  "model-selection": {
    expression: "m* = arg min_{m∈M} [L_val(m) + κ C(m)]",
    explanation: explanations(
      "Model selection can balance validation loss with an explicit complexity or operational cost.",
      "Lựa chọn mô hình có thể cân bằng mất mát thẩm định với chi phí độ phức tạp hoặc vận hành được nêu rõ.",
      "모델 선택은 검증 손실과 명시적인 복잡도·운영 비용의 균형을 맞출 수 있습니다.",
    ),
    variables: ["M: candidate models", "C(m): complexity or cost", "κ: trade-off weight"],
  },
  "data-imbalance": {
    expression: "π = n_positive / n,   w_positive ∝ 1/π",
    explanation: explanations(
      "Class prevalence π describes imbalance; inverse-frequency weighting is one possible response, not an automatic requirement.",
      "Tỷ lệ lớp π mô tả mất cân bằng; gán trọng số nghịch đảo tần suất là một lựa chọn, không phải yêu cầu tự động.",
      "클래스 비율 π는 불균형을 나타내며, 역빈도 가중은 가능한 대응 중 하나일 뿐 자동 규칙은 아닙니다.",
    ),
    variables: ["π: positive prevalence", "w_positive: positive-class weight"],
  },
  "why-evaluation-matters": {
    expression: "R(f) = E_{(x,y)~P_target}[L(f(x),y)]",
    explanation: explanations(
      "Evaluation estimates expected loss for a stated target population, not an abstract universal score.",
      "Đánh giá ước lượng mất mát kỳ vọng cho một quần thể mục tiêu đã nêu, không phải một điểm số phổ quát trừu tượng.",
      "평가는 추상적인 보편 점수가 아니라 명시한 목표 모집단의 기대 손실을 추정합니다.",
    ),
    variables: ["P_target: target distribution", "R(f): expected risk"],
  },
  "model-comparison": {
    expression: "d̄ = (1/n)Σᵢ[L_A(i)−L_B(i)],   SE(d̄)=s_d/√n",
    explanation: explanations(
      "Paired per-example differences estimate both the average advantage and its uncertainty.",
      "Chênh lệch ghép cặp theo từng ví dụ ước lượng cả lợi thế trung bình lẫn độ bất định của nó.",
      "예제별 대응 차이는 평균 우위와 그 불확실성을 함께 추정합니다.",
    ),
    variables: ["d̄: mean paired difference", "s_d: standard deviation of differences"],
  },
  "real-world-evaluation": {
    expression: "expected_cost(τ) = C_FP·FP(τ) + C_FN·FN(τ) + C_review·N_flagged(τ)",
    explanation: explanations(
      "Operational evaluation combines prediction errors with the capacity and cost created by a chosen threshold.",
      "Đánh giá vận hành kết hợp lỗi dự đoán với năng lực xử lý và chi phí do ngưỡng đã chọn tạo ra.",
      "운영 평가는 예측 오류와 선택한 임곗값이 만드는 처리 용량·비용을 결합합니다.",
    ),
    variables: ["τ: threshold", "C_FP,C_FN: error costs", "C_review: review cost"],
  },
  "bias-variance-and-overfitting": {
    expression: "E[(y−f̂(x))²] = bias² + variance + σ²_noise",
    explanation: explanations(
      "Squared prediction error can be analyzed as systematic bias, sample-dependent variance, and irreducible noise.",
      "Sai số dự đoán bình phương có thể được phân tích thành độ chệch hệ thống, phương sai phụ thuộc mẫu và nhiễu không thể loại bỏ.",
      "제곱 예측오차는 체계적 편향, 표본 의존 분산, 제거 불가능한 잡음으로 분석할 수 있습니다.",
    ),
    variables: ["bias: systematic error", "variance: sample sensitivity", "σ²_noise: irreducible noise"],
  },
  "fitting-concepts": {
    expression: "generalization_gap = L_val − L_train",
    explanation: explanations(
      "The train–validation gap is a useful diagnostic, but both loss levels must be read together.",
      "Khoảng cách huấn luyện–thẩm định là chẩn đoán hữu ích, nhưng phải đọc cùng mức mất mát của cả hai tập.",
      "학습–검증 간극은 유용한 진단값이지만 두 손실 수준을 함께 봐야 합니다.",
    ),
    variables: ["L_train: training loss", "L_val: validation loss"],
  },
  "model-complexity": {
    expression: "objective = L_train + λ·complexity(model)",
    explanation: explanations(
      "A complexity penalty makes the preference for a simpler model explicit rather than treating simplicity as a slogan.",
      "Hình phạt độ phức tạp làm rõ ưu tiên cho mô hình đơn giản thay vì chỉ xem đơn giản là khẩu hiệu.",
      "복잡도 패널티는 단순성을 구호가 아니라 명시적인 모델 선호로 만듭니다.",
    ),
    variables: ["λ: complexity weight", "L_train: fit term"],
  },
  "overfitting-detection": {
    expression: "overfit_signalₜ = L_val,t − min_{k≤t} L_val,k",
    explanation: explanations(
      "A rising validation loss after its best checkpoint is one signal of overfitting while training continues.",
      "Mất mát thẩm định tăng sau checkpoint tốt nhất là một tín hiệu quá khớp khi huấn luyện vẫn tiếp tục.",
      "학습이 계속되는 동안 최적 체크포인트 이후 검증 손실이 증가하면 과적합 신호가 됩니다.",
    ),
    variables: ["t: training step", "L_val,t: validation loss at step t"],
  },
  "underfitting-detection": {
    expression: "underfit ⇒ L_train is high ∧ L_val ≈ L_train",
    explanation: explanations(
      "Underfitting is indicated when the model cannot fit training data well and validation performance is similarly weak.",
      "Thiếu khớp xuất hiện khi mô hình không khớp tốt dữ liệu huấn luyện và hiệu năng thẩm định cũng yếu tương tự.",
      "과소적합은 모델이 학습 데이터도 잘 맞추지 못하고 검증 성능도 비슷하게 낮을 때 나타납니다.",
    ),
    variables: ["L_train: training loss", "L_val: validation loss"],
  },
  "data-vs-model": {
    expression: "error(n) ≈ error_∞ + a·n⁻ᵇ",
    explanation: explanations(
      "A learning-curve power law approximates diminishing returns from additional data and helps compare data collection with model changes.",
      "Quy luật lũy thừa của đường cong học xấp xỉ lợi ích giảm dần khi thêm dữ liệu và giúp so sánh thu thập dữ liệu với đổi mô hình.",
      "학습곡선의 멱법칙은 데이터 추가의 수익 체감을 근사해 데이터 수집과 모델 변경을 비교하게 합니다.",
    ),
    variables: ["n: training examples", "error_∞: asymptotic error", "a,b: fitted constants"],
  },
  "practical-fitting-solutions": {
    expression: "θ* = arg min_θ [L_data(θ) + λΩ(θ)]",
    explanation: explanations(
      "Regularization changes the fitted solution by balancing data fit with a stated structural preference.",
      "Điều chuẩn thay đổi nghiệm được khớp bằng cách cân bằng độ khớp dữ liệu với một ưu tiên cấu trúc đã nêu.",
      "정규화는 데이터 적합도와 명시한 구조적 선호의 균형을 맞춰 적합 해를 바꿉니다.",
    ),
    variables: ["Ω: regularizer", "λ: regularization strength"],
  },
  "data-preprocessing": {
    expression: "z = (x − μ_train) / σ_train",
    explanation: explanations(
      "Preprocessing statistics are estimated on training data and reused unchanged everywhere else.",
      "Thống kê tiền xử lý được ước lượng trên dữ liệu huấn luyện rồi tái sử dụng không đổi ở mọi nơi khác.",
      "전처리 통계는 학습 데이터에서 추정하고 다른 모든 데이터에 그대로 재사용합니다.",
    ),
    variables: ["μ_train: training mean", "σ_train: training standard deviation"],
  },
  "model-training": {
    expression: "θₜ₊₁ = θₜ − η·optimizer(∇_θ L_batch(θₜ))",
    explanation: explanations(
      "Model training repeatedly converts a batch loss gradient into a parameter update through an optimizer.",
      "Huấn luyện mô hình liên tục biến gradient mất mát trên lô thành cập nhật tham số thông qua bộ tối ưu.",
      "모델 학습은 배치 손실의 기울기를 옵티마이저를 통해 반복적으로 매개변수 업데이트로 바꿉니다.",
    ),
    variables: ["η: learning rate", "L_batch: batch loss", "θₜ: parameters at step t"],
  },
  "model-evaluation": {
    expression: "metric ± z_{1−α/2}·SE(metric)",
    explanation: explanations(
      "A point estimate should be accompanied by an uncertainty interval tied to a stated confidence level and sampling assumption.",
      "Ước lượng điểm nên đi cùng khoảng bất định gắn với mức tin cậy và giả định lấy mẫu đã nêu.",
      "점추정치는 명시한 신뢰수준과 표본 가정에 따른 불확실성 구간과 함께 제시해야 합니다.",
    ),
    variables: ["SE: standard error", "α: error probability", "z: normal quantile"],
  },
  "model-deployment": {
    expression: "latency_total = latency_pre + latency_model + latency_post + latency_network",
    explanation: explanations(
      "User-visible latency is the sum of preprocessing, inference, postprocessing, and communication—not inference time alone.",
      "Độ trễ người dùng thấy là tổng của tiền xử lý, suy luận, hậu xử lý và truyền thông—không chỉ thời gian suy luận.",
      "사용자가 체감하는 지연은 추론 시간만이 아니라 전처리·추론·후처리·통신의 합입니다.",
    ),
    variables: ["latency_model: inference time", "latency_network: communication time"],
  },
  "model-monitoring": {
    expression: "PSI = Σ_b (p_b−q_b) ln(p_b/q_b)",
    explanation: explanations(
      "The population stability index summarizes binned distribution change, but alerts still need sample-size and operational context.",
      "Chỉ số ổn định quần thể tóm tắt thay đổi phân phối theo bin, nhưng cảnh báo vẫn cần bối cảnh kích thước mẫu và vận hành.",
      "모집단 안정성 지수는 구간별 분포 변화를 요약하지만 경보에는 표본 크기와 운영 맥락이 필요합니다.",
    ),
    variables: ["p_b: reference share in bin b", "q_b: current share in bin b"],
  },
  "model-updating": {
    expression: "θ_new = arg min_θ [Σᵢ wᵢ L(f_θ(xᵢ),yᵢ) + λΩ(θ)]",
    explanation: explanations(
      "An update can weight recent or important examples while retaining an explicit regularization constraint.",
      "Bản cập nhật có thể gán trọng số cho ví dụ gần đây hoặc quan trọng trong khi vẫn giữ ràng buộc điều chuẩn rõ ràng.",
      "모델 업데이트는 최근·중요 예제에 가중치를 주면서 명시적인 정규화 제약을 유지할 수 있습니다.",
    ),
    variables: ["wᵢ: example weight", "λΩ: regularization term"],
  },
  "model-selection-strategy": {
    expression: "m* = arg max_{m∈M} utility(m)   s.t. latency(m)≤B, cost(m)≤C",
    explanation: explanations(
      "A production model is selected under latency and cost constraints, not by predictive score alone.",
      "Mô hình vận hành được chọn dưới ràng buộc độ trễ và chi phí, không chỉ theo điểm dự đoán.",
      "운영 모델은 예측 점수만이 아니라 지연과 비용 제약 아래에서 선택합니다.",
    ),
    variables: ["M: candidate models", "B: latency budget", "C: cost budget"],
  },
  "error-analysis": {
    expression: "error_slice(s) = (1/n_s) Σ_{i:xᵢ∈s} 𝟙[ŷᵢ≠yᵢ]",
    explanation: explanations(
      "Slice-level error rates reveal concentrated failures that one aggregate metric can hide.",
      "Tỷ lệ lỗi theo lát cắt cho thấy thất bại tập trung mà một chỉ số tổng hợp có thể che giấu.",
      "슬라이스별 오류율은 하나의 집계 지표가 숨길 수 있는 집중된 실패를 드러냅니다.",
    ),
    variables: ["s: data slice", "n_s: examples in slice", "𝟙: error indicator"],
  },
  scalability: {
    expression: "throughput = N/Δt,   utilization ρ = λ/(cμ)",
    explanation: explanations(
      "Throughput measures completed work per unit time; queue utilization compares arrival demand with total service capacity.",
      "Thông lượng đo công việc hoàn thành trên một đơn vị thời gian; mức sử dụng hàng đợi so sánh nhu cầu đến với tổng năng lực phục vụ.",
      "처리량은 단위 시간당 완료 작업을, 대기열 이용률은 도착 수요와 전체 서비스 용량의 비를 나타냅니다.",
    ),
    variables: ["λ: arrival rate", "μ: service rate per worker", "c: worker count"],
  },
  "production-considerations": {
    expression: "cost_request = cost_compute + cost_storage + cost_network + cost_review",
    explanation: explanations(
      "Per-request cost includes infrastructure and any human review triggered by the model's decision policy.",
      "Chi phí mỗi yêu cầu gồm hạ tầng và cả phản biện thủ công do chính sách quyết định của mô hình kích hoạt.",
      "요청당 비용에는 인프라뿐 아니라 모델의 결정 정책이 유발하는 사람 검토 비용도 포함됩니다.",
    ),
    variables: ["cost_review: human review cost", "cost_compute: inference compute cost"],
  },
  "metric-misuse": {
    expression: "decision_cost = C_FP·FP + C_FN·FN",
    explanation: explanations(
      "A metric is misaligned when it rewards a score that does not reflect the relative consequences of false positives and false negatives.",
      "Chỉ số bị lệch khi nó thưởng cho điểm số không phản ánh hậu quả tương đối của dương tính giả và âm tính giả.",
      "거짓 양성과 거짓 음성의 상대적 결과를 반영하지 않는 점수를 보상하면 지표가 의사결정과 어긋납니다.",
    ),
    variables: ["C_FP: false-positive cost", "C_FN: false-negative cost"],
  },
  "pitfall-imbalanced-data": {
    expression: "balanced_accuracy = ½[TP/(TP+FN) + TN/(TN+FP)]",
    explanation: explanations(
      "Balanced accuracy gives equal weight to sensitivity on each class, reducing the dominance of a large majority class.",
      "Độ chính xác cân bằng gán trọng số bằng nhau cho độ nhạy của mỗi lớp, giảm sự lấn át của lớp đa số lớn.",
      "균형 정확도는 각 클래스의 민감도에 같은 가중치를 주어 큰 다수 클래스의 지배를 줄입니다.",
    ),
    variables: ["TPR: positive-class recall", "TNR: negative-class recall"],
  },
  "debugging-strategies": {
    expression: "Δ_ablation = metric_full − metric_without_component",
    explanation: explanations(
      "An ablation measures the contribution of one component while holding the rest of the evaluation fixed.",
      "Thử nghiệm loại bỏ đo đóng góp của một thành phần trong khi giữ cố định phần còn lại của phép đánh giá.",
      "절제 실험은 나머지 평가 조건을 고정한 채 한 구성요소의 기여를 측정합니다.",
    ),
    variables: ["Δ_ablation: measured component contribution"],
  },
  "bad-splits": {
    expression: "entities(D_train) ∩ entities(D_test) = ∅",
    explanation: explanations(
      "When rows from one entity are correlated, keeping entities disjoint prevents identity leakage across the split.",
      "Khi các hàng của cùng một thực thể có tương quan, tách rời thực thể giúp ngăn rò rỉ danh tính qua phép chia.",
      "한 개체의 행들이 상관되어 있다면 개체를 분리해야 분할 사이의 식별자 누수를 막을 수 있습니다.",
    ),
    variables: ["entities(D): unique people, devices, groups, or cases in D"],
  },
  "pitfall-data-leakage": {
    expression: "I(feature; target_future | information_at_decision) > 0 ⇒ inspect leakage",
    explanation: explanations(
      "Unexpected information about a future target beyond what exists at decision time is a reason to investigate leakage.",
      "Thông tin bất ngờ về mục tiêu tương lai vượt quá dữ liệu có tại thời điểm quyết định là lý do phải điều tra rò rỉ.",
      "의사결정 시점 정보 이상으로 미래 목표를 설명하는 예상 밖의 정보가 있으면 누수를 조사해야 합니다.",
    ),
    variables: ["I: conditional mutual information"],
  },
  reproducibility: {
    expression: "result = F(data_version, code_version, config, seed)",
    explanation: explanations(
      "A reproducible result identifies every material input to the computation, including data, code, configuration, and randomness.",
      "Kết quả có thể tái tạo xác định mọi đầu vào quan trọng của phép tính, gồm dữ liệu, mã, cấu hình và tính ngẫu nhiên.",
      "재현 가능한 결과는 데이터·코드·설정·난수를 포함한 계산의 모든 중요한 입력을 식별합니다.",
    ),
    variables: ["F: complete computation", "seed: random-state initializer"],
  },
  "real-world-case-study": {
    expression: "design* = arg max_d utility(d)   s.t. risk(d)≤R, latency(d)≤B, cost(d)≤C",
    explanation: explanations(
      "A real system design maximizes useful outcomes while satisfying explicit risk, latency, and cost constraints.",
      "Thiết kế hệ thống thực tế tối đa hóa kết quả hữu ích trong khi thỏa các ràng buộc rõ ràng về rủi ro, độ trễ và chi phí.",
      "실제 시스템 설계는 명시적인 위험·지연·비용 제약을 만족하면서 효용을 최대화합니다.",
    ),
    variables: ["d: candidate design", "R: risk limit", "B: latency budget", "C: cost budget"],
  },
};

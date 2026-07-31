import type { FormulaStep, LearningLanguage } from "./learning-support";

const text = (en: string, vi: string, ko: string): Record<LearningLanguage, string> => ({ en, vi, ko });
const step = (
  stage: FormulaStep["stage"],
  expression: string,
  en: string,
  vi: string,
  ko: string,
): FormulaStep => ({ stage, expression, explanation: text(en, vi, ko) });

export const formulaFlowsBySlug: Record<string, FormulaStep[]> = {
  "ensemble-learning": [
    step("setup", "ŷₘ = fₘ(x),   m = 1,…,M", "Collect one prediction from each base model.", "Thu thập một dự đoán từ mỗi mô hình cơ sở.", "각 기본 모델에서 예측 하나씩을 모읍니다."),
    step("compute", "wₘ ≥ 0,   Σₘwₘ = 1", "Choose nonnegative weights that form a normalized mixture.", "Chọn trọng số không âm tạo thành một hỗn hợp chuẩn hóa.", "정규화된 혼합을 이루는 음이 아닌 가중치를 정합니다."),
  ],
  clustering: [
    step("setup", "cᵢ = arg min_k ‖xᵢ − μ_k‖²", "Assign every point to its nearest current center.", "Gán mỗi điểm cho tâm hiện tại gần nhất.", "각 점을 현재 가장 가까운 중심에 할당합니다."),
    step("compute", "μ_k = (1/|C_k|) Σ_{i∈C_k} xᵢ", "Recompute each center as the mean of its assigned points.", "Tính lại mỗi tâm bằng trung bình các điểm được gán.", "각 중심을 할당된 점들의 평균으로 다시 계산합니다."),
  ],
  "dimensionality-reduction-and-metric-learning": [
    step("setup", "X_c = X − 1μᵀ", "Center the observations before estimating directions.", "Đưa các quan sát về tâm trước khi ước lượng phương.", "방향을 추정하기 전에 관측값을 중심화합니다."),
    step("compute", "S = X_cᵀX_c/(n−1),   Sv_j = λ_jv_j", "Use the leading eigenvectors of the covariance matrix as projection directions.", "Dùng các vector riêng hàng đầu của ma trận hiệp phương sai làm phương chiếu.", "공분산 행렬의 주요 고유벡터를 투영 방향으로 사용합니다."),
  ],
  "sparse-dictionary-learning": [
    step("setup", "X ≈ Dα", "Represent observations with dictionary atoms and coefficients.", "Biểu diễn quan sát bằng các nguyên tử từ điển và hệ số.", "관측값을 사전 원자와 계수로 표현합니다."),
    step("compute", "α ← arg min_α ‖X−Dα‖²_F + λ‖α‖₁", "With the dictionary fixed, solve for sparse codes.", "Giữ cố định từ điển rồi giải các mã thưa.", "사전을 고정한 채 희소 코드를 구합니다."),
  ],
  "anomaly-detection": [
    step("setup", "s(x) = −log p̂(x)", "Convert model likelihood into an anomaly score.", "Chuyển khả năng theo mô hình thành điểm bất thường.", "모델 우도를 이상 점수로 바꿉니다."),
    step("compute", "τ = quantile_{1−α}({s(xᵢ)}_{normal})", "Calibrate a threshold from normal validation examples.", "Hiệu chỉnh ngưỡng từ các ví dụ xác thực bình thường.", "정상 검증 예제로 임곗값을 보정합니다."),
  ],
  "association-rule-learning": [
    step("setup", "support(A) = count(A)/N", "Measure how often an item set appears.", "Đo tần suất xuất hiện của một tập mục.", "항목 집합이 얼마나 자주 나타나는지 측정합니다."),
    step("compute", "support(A∩B) = count(A∪B)/N", "Count transactions containing both sides of the candidate rule.", "Đếm giao dịch chứa cả hai phía của luật ứng viên.", "후보 규칙의 양쪽을 모두 포함한 거래를 셉니다."),
  ],
  "decision-trees": [
    step("setup", "H(S) = −Σ_c p_c log₂p_c", "Measure class uncertainty in the current node.", "Đo độ bất định lớp trong nút hiện tại.", "현재 노드의 클래스 불확실성을 측정합니다."),
    step("compute", "H_after = Σ_j (n_j/n)H(S_j)", "Compute the size-weighted uncertainty after a candidate split.", "Tính độ bất định sau phép chia, có trọng số theo kích thước.", "후보 분할 뒤의 불확실성을 크기로 가중해 계산합니다."),
  ],
  "support-vector-machines": [
    step("setup", "mᵢ = yᵢ(wᵀxᵢ+b)", "Compute the signed margin for every training example.", "Tính biên có dấu cho từng ví dụ huấn luyện.", "각 학습 예제의 부호 있는 마진을 계산합니다."),
    step("compute", "ℓᵢ = max(0, 1−mᵢ)", "Penalize examples that lie inside or beyond the wrong side of the margin.", "Phạt các ví dụ nằm trong biên hoặc phía sai của biên.", "마진 안쪽이나 잘못된 쪽에 있는 예제에 패널티를 줍니다."),
  ],
  "linear-regression": [
    step("setup", "ŷᵢ = β₀ + Σ_j β_jxᵢⱼ", "Use the current coefficients to predict each response.", "Dùng các hệ số hiện tại để dự đoán từng đáp ứng.", "현재 계수로 각 반응값을 예측합니다."),
    step("compute", "eᵢ = yᵢ − ŷᵢ", "Turn every prediction into a residual.", "Chuyển mỗi dự đoán thành một phần dư.", "각 예측을 잔차로 바꿉니다."),
    step("compute", "MSE(β) = (1/n)Σ_i eᵢ²", "Combine all residuals into one differentiable measure of fit.", "Gộp mọi phần dư thành một thước đo độ khớp khả vi.", "모든 잔차를 하나의 미분 가능한 적합도 척도로 결합합니다."),
  ],
  "logistic-regression": [
    step("setup", "zᵢ = wᵀxᵢ+b", "Combine features into a linear score.", "Kết hợp các đặc trưng thành một điểm tuyến tính.", "특징을 선형 점수로 결합합니다."),
    step("compute", "pᵢ = 1/(1+e^{−zᵢ})", "Map the unbounded score to a probability.", "Ánh xạ điểm không bị chặn thành xác suất.", "제한 없는 점수를 확률로 변환합니다."),
    step("compute", "CE(w,b) = −(1/n)Σ_i[yᵢlog pᵢ + (1−yᵢ)log(1−pᵢ)]", "Measure how well those probabilities agree with the observed binary labels.", "Đo mức độ các xác suất đó phù hợp với nhãn nhị phân đã quan sát.", "그 확률이 관측된 이진 레이블과 얼마나 잘 맞는지 측정합니다."),
  ],
  "genetic-algorithms": [
    step("setup", "Fᵢ = fitness(candidateᵢ)", "Evaluate every candidate with the task objective.", "Đánh giá từng ứng viên bằng mục tiêu của tác vụ.", "과제 목적함수로 각 후보를 평가합니다."),
    step("compute", "Fᵢ ← max(Fᵢ−F_min, ε)", "Shift fitness to safe positive values before sampling.", "Dịch độ thích nghi về giá trị dương an toàn trước khi lấy mẫu.", "표본화 전에 적합도를 안전한 양수로 이동합니다."),
  ],
  perceptron: [
    step("setup", "sᵢ = wᵀxᵢ+b", "Compute the current signed score.", "Tính điểm có dấu hiện tại.", "현재 부호 점수를 계산합니다."),
    step("compute", "ŷᵢ = sign(sᵢ),   mistake = 𝟙[ŷᵢ≠yᵢ]", "Update only when the predicted label is wrong.", "Chỉ cập nhật khi nhãn dự đoán sai.", "예측 레이블이 틀렸을 때만 갱신합니다."),
  ],
  "naive-bayes-classifier": [
    step("setup", "log score(y) = log P(y) + Σ_j log P(x_j|y)", "Add log-prior and log-likelihood terms for numerical stability.", "Cộng log tiên nghiệm và log khả năng để ổn định số học.", "수치 안정성을 위해 로그 사전확률과 로그 우도를 더합니다."),
    step("compute", "P(y|x) = exp(log score(y)) / Σ_c exp(log score(c))", "Normalize the class scores into posterior probabilities.", "Chuẩn hóa các điểm lớp thành xác suất hậu nghiệm.", "클래스 점수를 사후확률로 정규화합니다."),
  ],
  "relevance-vector-machine": [
    step("setup", "Φᵢⱼ = K(xᵢ,xⱼ)", "Build a kernel design matrix from training examples.", "Lập ma trận thiết kế kernel từ các ví dụ huấn luyện.", "학습 예제로 커널 설계 행렬을 만듭니다."),
    step("compute", "Σ = (βΦᵀΦ + A)⁻¹,   μ = βΣΦᵀy", "Combine likelihood precision with sparse weight priors.", "Kết hợp độ chính xác của khả năng với tiên nghiệm trọng số thưa.", "우도 정밀도와 희소 가중치 사전분포를 결합합니다."),
  ],
  "ml-problem-formulation": [
    step("setup", "D = {(xᵢ,yᵢ)}_{i=1}^n", "State the available observations and target explicitly.", "Nêu rõ các quan sát và mục tiêu hiện có.", "사용 가능한 관측값과 목표를 명시합니다."),
    step("compute", "R̂(θ) = (1/n)Σ_i L(f_θ(xᵢ),yᵢ)", "Translate the product goal into a measurable empirical risk.", "Chuyển mục tiêu sản phẩm thành rủi ro thực nghiệm đo được.", "제품 목표를 측정 가능한 경험적 위험으로 바꿉니다."),
  ],
  "data-normalization": [
    step("setup", "μ = (1/n)Σ_i xᵢ", "Estimate the feature mean from training data only.", "Ước lượng trung bình đặc trưng chỉ từ dữ liệu huấn luyện.", "학습 데이터만으로 특징 평균을 추정합니다."),
    step("compute", "σ = √[(1/n)Σ_i(xᵢ−μ)²]", "Estimate the matching scale without using validation data.", "Ước lượng thang đo tương ứng mà không dùng dữ liệu xác thực.", "검증 데이터를 쓰지 않고 대응하는 척도를 추정합니다."),
  ],
  "feature-selection": [
    step("setup", "L(w) = (1/n)Σ_i L(f_w(xᵢ),yᵢ)", "Measure prediction error for the current feature weights.", "Đo sai số dự đoán cho các trọng số đặc trưng hiện tại.", "현재 특징 가중치의 예측오차를 측정합니다."),
    step("compute", "Ω(w) = Σ_j |w_j|", "Add an L1 penalty that can drive unnecessary coefficients to zero.", "Thêm phạt L1 có thể đưa các hệ số không cần thiết về không.", "불필요한 계수를 0으로 만들 수 있는 L1 패널티를 더합니다."),
  ],
  "data-visualization": [
    step("setup", "x̃ᵢ = xᵢ−x̄,   ỹᵢ = yᵢ−ȳ", "Center both variables before measuring association.", "Đưa cả hai biến về tâm trước khi đo liên hệ.", "연관성을 측정하기 전에 두 변수를 중심화합니다."),
    step("compute", "cov(x,y) = Σ_i x̃ᵢỹᵢ/(n−1)", "Measure whether centered values move together.", "Đo xem các giá trị đã đưa về tâm có cùng biến động hay không.", "중심화된 값이 함께 움직이는지 측정합니다."),
  ],
  "cross-validation": [
    step("setup", "D = V₁ ⊔ V₂ ⊔ … ⊔ V_K", "Partition examples into non-overlapping folds.", "Chia các ví dụ thành các fold không chồng lấp.", "예제를 겹치지 않는 폴드로 나눕니다."),
    step("compute", "m_k = metric(train(D∖V_k), V_k)", "Train without fold k, then evaluate on that held-out fold.", "Huấn luyện không dùng fold k rồi đánh giá trên fold được giữ lại.", "k번째 폴드를 제외하고 학습한 뒤 그 폴드에서 평가합니다."),
  ],
  "hyperparameter-tuning": [
    step("setup", "Λ = {λ₁,…,λ_M}", "Define the candidate search space before seeing test results.", "Xác định không gian tìm kiếm ứng viên trước khi xem kết quả kiểm thử.", "테스트 결과를 보기 전에 후보 탐색 공간을 정합니다."),
    step("compute", "s_m = CV(λ_m)", "Estimate each candidate's generalization score with validation folds.", "Ước lượng khả năng khái quát của từng ứng viên bằng các fold xác thực.", "검증 폴드로 각 후보의 일반화 점수를 추정합니다."),
  ],
  "training-loop": [
    step("setup", "L_t = (1/B)Σ_{i∈batch_t} L(f_{θ_t}(xᵢ),yᵢ)", "Compute loss on the current mini-batch.", "Tính mất mát trên mini-batch hiện tại.", "현재 미니배치의 손실을 계산합니다."),
    step("compute", "g_t = ∇_θL_t", "Differentiate the batch loss with respect to model parameters.", "Lấy đạo hàm mất mát của batch theo tham số mô hình.", "배치 손실을 모델 매개변수에 대해 미분합니다."),
  ],
  reproducibility: [
    step("setup", "run_id = hash(data, code, config, seed)", "Identify a run from every input that can change its result.", "Nhận diện một lần chạy từ mọi đầu vào có thể đổi kết quả.", "결과를 바꿀 수 있는 모든 입력으로 실행을 식별합니다."),
    step("compute", "Δ = metric(run_a) − metric(run_b)", "Compare runs only after their inputs are recorded.", "Chỉ so sánh các lần chạy sau khi đã ghi nhận đầu vào.", "입력을 기록한 뒤에만 실행 결과를 비교합니다."),
  ],
  "confusion-matrix": [
    step("setup", "ŷᵢ(τ) = 𝟙[pᵢ ≥ τ]", "Convert predicted probabilities to labels at a chosen threshold.", "Chuyển xác suất dự đoán thành nhãn tại ngưỡng đã chọn.", "선택한 임곗값에서 예측 확률을 레이블로 바꿉니다."),
    step("compute", "TP = Σ_i 𝟙[yᵢ=1 ∧ ŷᵢ=1]", "Count one cell; the other three use the remaining label pairs.", "Đếm một ô; ba ô còn lại dùng các cặp nhãn khác.", "한 셀을 세고 나머지 세 셀도 다른 레이블 쌍으로 셉니다."),
  ],
  "roc-auc": [
    step("setup", "ŷᵢ(τ) = 𝟙[pᵢ ≥ τ]", "Sweep a decision threshold over model scores.", "Quét ngưỡng quyết định trên các điểm của mô hình.", "모델 점수에 걸쳐 결정 임곗값을 이동합니다."),
    step("compute", "ROC = {(FPR(τ),TPR(τ)) : τ∈[0,1]}", "Record the false-positive and true-positive trade-off at each threshold.", "Ghi lại đánh đổi dương giả và dương thật tại mỗi ngưỡng.", "각 임곗값에서 거짓 양성과 참 양성의 절충을 기록합니다."),
  ],
  "real-world-evaluation": [
    step("setup", "FP(τ)=Σ_i𝟙[yᵢ=0∧pᵢ≥τ],   FN(τ)=Σ_i𝟙[yᵢ=1∧pᵢ<τ]", "Count operational mistakes at a candidate threshold.", "Đếm lỗi vận hành tại một ngưỡng ứng viên.", "후보 임곗값에서 운영 오류를 셉니다."),
    step("compute", "N_flagged(τ)=Σ_i𝟙[pᵢ≥τ]", "Estimate the human or system workload created by that threshold.", "Ước lượng tải công việc do ngưỡng đó tạo ra.", "그 임곗값이 만드는 사람 또는 시스템의 작업량을 추정합니다."),
  ],
  "overfitting-detection": [
    step("setup", "g_t = L_val,t − L_train,t", "Track the train–validation generalization gap.", "Theo dõi khoảng cách khái quát giữa huấn luyện và xác thực.", "학습-검증 일반화 격차를 추적합니다."),
    step("compute", "t_best = arg min_t L_val,t", "Locate the checkpoint with the best validation loss.", "Xác định checkpoint có mất mát xác thực tốt nhất.", "검증 손실이 가장 좋은 체크포인트를 찾습니다."),
  ],
  "underfitting-detection": [
    step("setup", "L_train ≫ L_target", "First check whether the model fits even the training examples poorly.", "Trước hết kiểm tra mô hình có khớp kém ngay cả dữ liệu huấn luyện hay không.", "먼저 모델이 학습 예제조차 제대로 적합하지 못하는지 확인합니다."),
    step("compute", "gap = |L_val−L_train|", "A small gap does not help when both losses remain high.", "Khoảng cách nhỏ không có ích khi cả hai mất mát vẫn cao.", "두 손실이 모두 높다면 작은 격차는 도움이 되지 않습니다."),
  ],
  "practical-fitting-solutions": [
    step("setup", "J(θ,λ)=L_data(θ)+λΩ(θ)", "Write the fitting and complexity terms in one objective.", "Viết các hạng tử độ khớp và độ phức tạp trong một mục tiêu.", "적합도와 복잡도 항을 하나의 목적함수로 씁니다."),
    step("compute", "θ*(λ)=arg min_θ J(θ,λ)", "Fit one model for each candidate regularization strength.", "Khớp một mô hình cho mỗi độ mạnh điều chuẩn ứng viên.", "각 후보 정규화 강도마다 모델 하나를 적합합니다."),
    step("compute", "λ* = arg min_λ L_val(θ*(λ))", "Use validation loss to choose among the fitted regularization strengths.", "Dùng mất mát xác thực để chọn trong các độ mạnh điều chuẩn đã khớp.", "검증 손실로 적합한 정규화 강도 중 하나를 선택합니다."),
  ],
  "model-training": [
    step("setup", "L_batch(θ_t)=(1/B)Σ_iL(f_{θ_t}(xᵢ),yᵢ)", "Aggregate example losses within the current batch.", "Gộp mất mát của các ví dụ trong batch hiện tại.", "현재 배치 안의 예제 손실을 집계합니다."),
    step("compute", "g_t=∇_θL_batch(θ_t)", "Backpropagation supplies the gradient used by the optimizer.", "Lan truyền ngược cung cấp gradient cho bộ tối ưu.", "역전파가 옵티마이저에 사용할 그래디언트를 제공합니다."),
  ],
  "error-analysis": [
    step("setup", "E={i:ŷᵢ≠yᵢ}", "Collect the indices of incorrect predictions.", "Thu thập chỉ số của các dự đoán sai.", "잘못 예측한 인덱스를 모읍니다."),
    step("compute", "n_s=Σ_i𝟙[xᵢ∈s]", "Measure each slice's support before trusting its error rate.", "Đo số mẫu của từng lát cắt trước khi tin cậy tỷ lệ lỗi.", "슬라이스의 오류율을 신뢰하기 전에 표본 수를 측정합니다."),
  ],
  "real-world-case-study": [
    step("setup", "U(d)=benefit(d)−cost(d)", "Express the desired outcome as utility rather than accuracy alone.", "Biểu diễn kết quả mong muốn bằng tiện ích thay vì chỉ độ chính xác.", "원하는 결과를 정확도만이 아닌 효용으로 표현합니다."),
    step("compute", "feasible(d)=𝟙[risk(d)≤R ∧ latency(d)≤B ∧ cost(d)≤C]", "Reject designs that violate any operating constraint.", "Loại các thiết kế vi phạm bất kỳ ràng buộc vận hành nào.", "운영 제약을 하나라도 위반하는 설계를 제외합니다."),
  ],
  "debugging-strategies": [
    step("setup", "m_full=metric(system)", "Record a stable baseline before changing components.", "Ghi lại đường cơ sở ổn định trước khi thay đổi thành phần.", "구성요소를 바꾸기 전에 안정적인 기준선을 기록합니다."),
    step("compute", "m_{−j}=metric(system without component j)", "Remove one component while holding the rest fixed.", "Loại một thành phần trong khi giữ cố định phần còn lại.", "나머지는 고정하고 구성요소 하나를 제거합니다."),
  ],
};

const componentsBySlug: Record<string, string[][]> = {
  "ensemble-learning": [
    ["ŷₘ: prediction from base model m", "fₘ: base model m", "x: input", "M: number of models"],
    ["wₘ: weight of model m", "Σₘwₘ=1: normalized weights", "wₘ≥0: nonnegative contribution"],
  ],
  clustering: [
    ["xᵢ: data point i", "μ_k: center of cluster k", "cᵢ: assigned cluster", "‖·‖²: squared distance"],
    ["C_k: points assigned to cluster k", "|C_k|: cluster size", "μ_k: updated mean center"],
  ],
  "dimensionality-reduction-and-metric-learning": [
    ["X: data matrix", "μ: feature-mean vector", "1μᵀ: repeated mean row", "X_c: centered data"],
    ["S: covariance matrix", "v_j: eigenvector", "λ_j: explained variance", "n: sample count"],
  ],
  "sparse-dictionary-learning": [
    ["X: observations", "D: dictionary atoms", "α: sparse coefficients", "≈: approximate reconstruction"],
    ["‖X−Dα‖²_F: reconstruction error", "‖α‖₁: sparsity penalty", "λ: sparsity strength"],
  ],
  "anomaly-detection": [
    ["p̂(x): estimated normal-data likelihood", "−log: negative log transform", "s(x): anomaly score"],
    ["τ: alert threshold", "α: allowed normal-tail rate", "quantile: selected score percentile"],
  ],
  "association-rule-learning": [
    ["A: item set", "count(A): transactions containing A", "N: transaction count", "support(A): occurrence rate"],
    ["A∩B: transactions satisfying both sides", "A∪B: all items required together", "support(A∩B): joint rate"],
  ],
  "decision-trees": [
    ["S: samples at a node", "c: class", "p_c: class proportion", "H(S): entropy"],
    ["S_j: child subset j", "n_j/n: child weight", "H_after: weighted post-split entropy"],
  ],
  "support-vector-machines": [
    ["xᵢ: feature vector", "yᵢ∈{−1,+1}: label", "w,b: separating hyperplane", "mᵢ: signed margin"],
    ["ℓᵢ: hinge loss", "1−mᵢ: margin shortfall", "max(0,·): no penalty outside the margin"],
  ],
  "linear-regression": [
    ["ŷᵢ: prediction", "β₀: intercept", "β_j: coefficient j", "xᵢⱼ: feature j of example i"],
    ["eᵢ: residual", "yᵢ: observed response", "ŷᵢ: predicted response"],
    ["MSE: mean squared error", "eᵢ²: squared residual", "n: sample count", "β: coefficient vector"],
  ],
  "logistic-regression": [
    ["zᵢ: linear score", "w: weight vector", "xᵢ: feature vector", "b: intercept"],
    ["pᵢ: predicted positive probability", "e: exponential constant", "zᵢ: linear score"],
    ["CE: binary cross-entropy", "yᵢ: binary label", "pᵢ: predicted probability", "n: sample count"],
  ],
  "genetic-algorithms": [
    ["candidateᵢ: solution i", "fitness(·): task objective", "Fᵢ: raw fitness"],
    ["F_min: smallest fitness", "ε: positive floor", "Fᵢ: safe selection weight"],
  ],
  perceptron: [
    ["sᵢ: signed score", "w: weight vector", "xᵢ: feature vector", "b: intercept"],
    ["ŷᵢ: predicted label", "sign(·): sign decision", "𝟙[·]: mistake indicator", "yᵢ: true label"],
  ],
  "naive-bayes-classifier": [
    ["P(y): class prior", "P(x_j|y): feature likelihood", "log score(y): unnormalized log posterior"],
    ["P(y|x): posterior probability", "exp(·): inverse log transform", "c: candidate class", "Σ_c: normalization over classes"],
  ],
  "relevance-vector-machine": [
    ["Φ: kernel design matrix", "K: kernel function", "xᵢ,xⱼ: training examples"],
    ["Σ: posterior covariance", "μ: posterior mean", "β: noise precision", "A: prior-precision matrix"],
  ],
  "ml-problem-formulation": [
    ["D: dataset", "xᵢ: input", "yᵢ: target", "n: example count"],
    ["R̂(θ): empirical risk", "f_θ: parameterized model", "L: example loss", "θ: parameters"],
  ],
  "data-normalization": [
    ["μ: training mean", "xᵢ: training value", "n: training count"],
    ["σ: training standard deviation", "xᵢ−μ: centered value", "√: square root"],
  ],
  "feature-selection": [
    ["L(w): prediction loss", "f_w: weighted model", "xᵢ,yᵢ: labeled example", "n: sample count"],
    ["Ω(w): L1 penalty", "w_j: feature coefficient", "|w_j|: coefficient magnitude"],
  ],
  "data-visualization": [
    ["x̄,ȳ: sample means", "x̃ᵢ,ỹᵢ: centered values", "xᵢ,yᵢ: paired observation"],
    ["cov(x,y): covariance", "Σ_ix̃ᵢỹᵢ: joint variation", "n−1: sample correction"],
  ],
  "cross-validation": [
    ["D: complete dataset", "V_k: validation fold k", "⊔: disjoint union", "K: fold count"],
    ["D∖V_k: training folds", "m_k: fold metric", "train(·): fitting procedure"],
  ],
  "hyperparameter-tuning": [
    ["Λ: search space", "λ_m: candidate configuration", "M: candidate count"],
    ["s_m: validation score", "CV(λ_m): cross-validated evaluation", "λ_m: candidate"],
  ],
  "training-loop": [
    ["L_t: batch loss", "B: batch size", "θ_t: current parameters", "f_{θ_t}: current model"],
    ["g_t: gradient", "∇_θ: derivative by parameters", "L_t: current loss"],
  ],
  reproducibility: [
    ["run_id: experiment identity", "hash(·): deterministic fingerprint", "seed: random seed"],
    ["Δ: metric difference", "run_a,run_b: recorded runs", "metric(·): evaluation function"],
  ],
  "confusion-matrix": [
    ["pᵢ: predicted probability", "τ: decision threshold", "ŷᵢ: predicted label", "𝟙: indicator"],
    ["TP: true-positive count", "yᵢ: true label", "ŷᵢ: predicted label", "∧: both conditions"],
  ],
  "roc-auc": [
    ["pᵢ: model score", "τ: swept threshold", "ŷᵢ(τ): thresholded decision"],
    ["TPR(τ): true-positive rate", "FPR(τ): false-positive rate", "ROC: set of rate pairs"],
  ],
  "real-world-evaluation": [
    ["FP(τ): false positives", "FN(τ): false negatives", "pᵢ: score", "τ: threshold"],
    ["N_flagged(τ): review volume", "𝟙[pᵢ≥τ]: flagged-case indicator", "Σ_i: sum over cases"],
  ],
  "overfitting-detection": [
    ["g_t: generalization gap", "L_val,t: validation loss", "L_train,t: training loss"],
    ["t_best: best checkpoint", "arg min_t: lowest-loss epoch", "L_val,t: validation loss history"],
  ],
  "underfitting-detection": [
    ["L_train: training loss", "L_target: acceptable target loss", "≫: substantially larger"],
    ["gap: train–validation difference", "L_val: validation loss", "|·|: absolute difference"],
  ],
  "practical-fitting-solutions": [
    ["J: regularized objective", "L_data: fit loss", "Ω: complexity penalty", "λ: penalty strength"],
    ["θ*(λ): fitted parameters", "arg min_θ: loss-minimizing choice", "λ: candidate strength"],
    ["λ*: selected strength", "L_val: validation loss", "θ*(λ): model fitted at strength λ"],
  ],
  "model-training": [
    ["L_batch: batch loss", "B: batch size", "f_{θ_t}: current model", "yᵢ: target"],
    ["g_t: parameter gradient", "∇_θ: differentiation", "L_batch: batch objective"],
  ],
  "error-analysis": [
    ["E: error-index set", "ŷᵢ: prediction", "yᵢ: target", "≠: incorrect decision"],
    ["n_s: slice size", "s: chosen data slice", "𝟙[xᵢ∈s]: membership indicator"],
  ],
  "real-world-case-study": [
    ["U(d): utility of design d", "benefit(d): expected gain", "cost(d): expected expense"],
    ["feasible(d): constraint indicator", "R,B,C: risk, latency, and cost limits", "∧: all constraints hold"],
  ],
  "debugging-strategies": [
    ["m_full: baseline metric", "system: complete pipeline", "metric(·): stable evaluation"],
    ["m_{−j}: ablated metric", "component j: removed subsystem", "system without j: controlled ablation"],
  ],
};

for (const [slug, components] of Object.entries(componentsBySlug)) {
  formulaFlowsBySlug[slug]?.forEach((formulaStep, index) => {
    formulaStep.components = components[index];
  });
}

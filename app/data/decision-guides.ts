import type { CurriculumSeed } from "./full-curriculum";
import type { DepthLanguage, TopicDepth } from "./topic-depth-types";

export type DecisionGuide = {
  question: string;
  steps: Array<{
    label: string;
    prompt: string;
    action: string;
  }>;
  alternatives: string[];
  reconsider: string;
};

type LocalizedText = Record<DepthLanguage, string>;

type DecisionProfile = {
  match: RegExp;
  gate: LocalizedText;
  comparison: LocalizedText;
  alternatives: Record<DepthLanguage, [string, string]>;
  evidence: LocalizedText;
  reconsider: LocalizedText;
};

const text = (en: string, vi: string, ko: string): LocalizedText => ({ en, vi, ko });

const profile = (
  match: RegExp,
  gate: LocalizedText,
  comparison: LocalizedText,
  alternatives: Record<DepthLanguage, [string, string]>,
  evidence: LocalizedText,
  reconsider: LocalizedText,
): DecisionProfile => ({ match, gate, comparison, alternatives, evidence, reconsider });

const profiles: DecisionProfile[] = [
  profile(
    /distribution-shift|concept-drift|covariate-shift/,
    text(
      "Treat change as a hypothesis to classify: input prevalence, label prevalence, conditional behavior, collection, or policy may have moved.",
      "Xem thay đổi như một giả thuyết cần phân loại: input prevalence, label prevalence, conditional behavior, collection hoặc policy có thể đã dịch chuyển.",
      "변화를 분류할 가설로 다룹니다. 입력 분포, 레이블 비율, 조건부 관계, 수집 과정, 정책이 달라졌을 수 있습니다.",
    ),
    text(
      "Compare current and reference periods by meaningful slices, then separate harmless input drift from outcome-relevant concept change.",
      "So sánh giai đoạn hiện tại với giai đoạn tham chiếu theo slice có ý nghĩa, rồi tách input drift vô hại khỏi concept change ảnh hưởng outcome.",
      "현재와 기준 기간을 의미 있는 슬라이스별로 비교한 뒤 무해한 입력 드리프트와 결과에 영향을 주는 개념 변화를 구분합니다.",
    ),
    {
      en: ["Reference-period replay", "Outcome and policy audit"],
      vi: ["Replay giai đoạn tham chiếu", "Audit outcome và policy"],
      ko: ["기준 기간 재현", "결과 및 정책 감사"],
    },
    text(
      "Check schema, missingness, feature and score distributions, decision rates, delayed labels, and performance by stable cohorts.",
      "Kiểm tra schema, missingness, phân phối feature và score, decision rate, label đến trễ và hiệu năng theo cohort ổn định.",
      "스키마, 결측, 특징·점수 분포, 결정 비율, 지연 레이블, 안정적 코호트별 성능을 확인합니다.",
    ),
    text(
      "Change course when the original evaluation population no longer represents use, the action policy changed outcomes, or labeled evidence confirms material degradation.",
      "Đổi hướng khi population đánh giá ban đầu không còn đại diện việc sử dụng, action policy làm đổi outcome hoặc bằng chứng có nhãn xác nhận suy giảm đáng kể.",
      "기존 평가 모집단이 실제 사용을 더는 대표하지 않거나 행동 정책이 결과를 바꾸었거나 레이블 근거가 실질적 저하를 확인하면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /graph-machine-learning/,
    text(
      "Use a graph only when relationships carry predictive meaning that is available at decision time and cannot be represented adequately by independent rows.",
      "Chỉ dùng graph khi quan hệ mang ý nghĩa dự báo, có sẵn tại decision time và không thể biểu diễn đầy đủ bằng các hàng độc lập.",
      "관계가 예측 의미를 가지며 결정 시점에 이용 가능하고 독립 행으로 충분히 표현할 수 없을 때만 그래프를 사용합니다.",
    ),
    text(
      "Compare graph features and message passing with a row-only model so the value of relational evidence is measurable.",
      "So sánh graph feature và message passing với mô hình chỉ dùng hàng để đo được giá trị của relational evidence.",
      "관계 근거의 가치를 측정할 수 있도록 그래프 특징·메시지 패싱을 행 기반 모델과 비교합니다.",
    ),
    {
      en: ["Row-only model", "Hand-engineered neighborhood features"],
      vi: ["Mô hình chỉ dùng hàng", "Neighborhood feature thiết kế thủ công"],
      ko: ["행 기반 모델", "수작업 이웃 특징"],
    },
    text(
      "Split by time and connected components when necessary, and test cold nodes, changing edges, leakage through neighbors, latency, and memory.",
      "Chia theo time và connected component khi cần, đồng thời kiểm tra cold node, edge thay đổi, leakage qua neighbor, latency và memory.",
      "필요하면 시간과 연결요소별로 분할하고 콜드 노드, 변하는 엣지, 이웃을 통한 누수, 지연, 메모리를 점검합니다.",
    ),
    text(
      "Change course when graph construction leaks future information, edges are too stale or costly, or a row-based alternative matches the result.",
      "Đổi hướng khi dựng graph làm rò rỉ tương lai, edge quá cũ hoặc tốn kém, hay phương án theo hàng đạt kết quả tương đương.",
      "그래프 구성이 미래 정보를 누수하거나 엣지가 너무 오래되거나 비싸거나 행 기반 대안이 같은 결과를 내면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /linear-regression|regression-analysis|logistic-regression|parametric-vs-nonparametric|model-vs-algorithm/,
    text(
      "Use it when the target and link function fit the task and a compact, inspectable relationship is valuable.",
      "Dùng khi biến mục tiêu và hàm liên kết phù hợp với tác vụ, đồng thời một quan hệ gọn và dễ kiểm tra có giá trị.",
      "목표와 링크 함수가 과업에 맞고 간결하며 점검 가능한 관계가 중요할 때 사용합니다.",
    ),
    text(
      "Compare with a mean or prevalence baseline, then with a nonlinear model if residuals show structure.",
      "So sánh với baseline trung bình hoặc prevalence, rồi với mô hình phi tuyến nếu phần dư còn cấu trúc.",
      "평균 또는 발생률 기준선과 비교하고 잔차에 구조가 남으면 비선형 모델과 비교합니다.",
    ),
    {
      en: ["Mean/prevalence baseline", "Tree or spline model"],
      vi: ["Baseline trung bình/prevalence", "Mô hình cây hoặc spline"],
      ko: ["평균/발생률 기준선", "트리 또는 스플라인 모델"],
    },
    text(
      "Inspect held-out error, residual patterns, coefficient stability, and calibration when probabilities are used.",
      "Kiểm tra lỗi trên dữ liệu giữ lại, cấu trúc phần dư, độ ổn định hệ số và calibration khi dùng xác suất.",
      "홀드아웃 오차, 잔차 패턴, 계수 안정성, 확률 사용 시 보정을 확인합니다.",
    ),
    text(
      "Change course when residual curvature, unstable coefficients, influential outliers, or a stronger simple alternative contradict the assumptions.",
      "Đổi hướng khi độ cong phần dư, hệ số thiếu ổn định, ngoại lệ có ảnh hưởng hoặc phương án đơn giản tốt hơn bác bỏ giả định.",
      "잔차 곡률, 불안정한 계수, 영향력이 큰 이상치, 더 나은 단순 대안이 가정을 반박하면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /decision-tree|ensemble-learning|model-complexity/,
    text(
      "Use it when interactions or nonlinear rules matter and the available sample can support the chosen capacity.",
      "Dùng khi tương tác hoặc quy tắc phi tuyến quan trọng và cỡ mẫu có thể hỗ trợ mức capacity đã chọn.",
      "상호작용이나 비선형 규칙이 중요하고 표본이 선택한 모델 용량을 뒷받침할 때 사용합니다.",
    ),
    text(
      "Compare a pruned tree with a linear baseline; add an ensemble only when its held-out gain justifies cost and reduced interpretability.",
      "So sánh cây đã pruning với baseline tuyến tính; chỉ thêm ensemble khi lợi ích trên dữ liệu giữ lại xứng đáng với chi phí và giảm khả năng diễn giải.",
      "가지치기한 트리를 선형 기준선과 비교하고 홀드아웃 이득이 비용과 해석성 저하를 정당화할 때만 앙상블을 추가합니다.",
    ),
    {
      en: ["Regularized linear model", "Pruned single tree"],
      vi: ["Mô hình tuyến tính có regularization", "Một cây đã pruning"],
      ko: ["정규화 선형 모델", "가지치기한 단일 트리"],
    },
    text(
      "Check held-out performance, depth sensitivity, subgroup errors, latency, and stability across resamples.",
      "Kiểm tra hiệu năng giữ lại, độ nhạy theo depth, lỗi nhóm con, latency và độ ổn định qua các lần lấy mẫu lại.",
      "홀드아웃 성능, 깊이 민감도, 하위 집단 오류, 지연 시간, 재표본화 안정성을 확인합니다.",
    ),
    text(
      "Change course when small data changes rewrite the rules, complexity adds no stable gain, or operating cost exceeds the value of the improvement.",
      "Đổi hướng khi thay đổi nhỏ của dữ liệu làm viết lại quy tắc, độ phức tạp không tạo lợi ích ổn định hoặc chi phí vận hành vượt giá trị cải thiện.",
      "작은 데이터 변화가 규칙을 크게 바꾸거나 복잡도가 안정적 이득을 주지 못하거나 운영 비용이 개선 가치를 넘으면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /(?:^| )supervised-learning(?: |$)|support-vector|perceptron|naive-bayes|relevance-vector|genetic-algorithm/,
    text(
      "Use the method only when its geometry, independence, sparsity, or search assumptions match the evidence and constraints.",
      "Chỉ dùng phương pháp khi giả định về hình học, độc lập, sparsity hoặc tìm kiếm phù hợp bằng chứng và ràng buộc.",
      "기하, 독립성, 희소성, 탐색 가정이 근거와 제약에 맞을 때만 이 방법을 사용합니다.",
    ),
    text(
      "Compare it with a regularized linear baseline and one method whose assumptions differ in the suspected weak spot.",
      "So sánh với baseline tuyến tính có regularization và một phương pháp có giả định khác tại điểm yếu nghi ngờ.",
      "정규화 선형 기준선 및 의심되는 약점에서 다른 가정을 가진 방법과 비교합니다.",
    ),
    {
      en: ["Regularized linear baseline", "Tree-based baseline"],
      vi: ["Baseline tuyến tính có regularization", "Baseline dựa trên cây"],
      ko: ["정규화 선형 기준선", "트리 기반 기준선"],
    },
    text(
      "Test sensitivity to scaling, sampling, hyperparameters, and the examples closest to the learned boundary.",
      "Kiểm tra độ nhạy với scaling, sampling, hyperparameter và các ví dụ gần biên đã học nhất.",
      "스케일링, 표본추출, 하이퍼파라미터, 학습된 경계에 가장 가까운 예제에 대한 민감도를 확인합니다.",
    ),
    text(
      "Change course when the defining assumption fails, tuning is unstable, or a simpler baseline reaches the same operating result.",
      "Đổi hướng khi giả định cốt lõi sai, tuning thiếu ổn định hoặc baseline đơn giản đạt cùng kết quả vận hành.",
      "핵심 가정이 깨지거나 튜닝이 불안정하거나 더 단순한 기준선이 같은 운영 결과를 내면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /cluster|unsupervised|semi-supervised|anomaly|association-rule|dimensionality|dictionary|feature-learning|self-supervised|embedding/,
    text(
      "Use it when labels are absent or representation is the real bottleneck, and when similarity, distance, or reconstruction has domain meaning.",
      "Dùng khi thiếu nhãn hoặc representation là nút thắt thật, và similarity, distance hoặc reconstruction có ý nghĩa trong domain.",
      "레이블이 없거나 표현이 실제 병목이며 유사도·거리·재구성이 도메인 의미를 가질 때 사용합니다.",
    ),
    text(
      "Compare with a direct domain rule and alternative representations or distance definitions before interpreting discovered structure.",
      "So sánh với quy tắc domain trực tiếp và các representation hoặc định nghĩa distance khác trước khi diễn giải cấu trúc tìm được.",
      "발견한 구조를 해석하기 전에 직접적인 도메인 규칙과 다른 표현·거리 정의를 비교합니다.",
    ),
    {
      en: ["Domain rule or manual grouping", "Alternative representation or distance"],
      vi: ["Quy tắc domain hoặc phân nhóm thủ công", "Representation hoặc distance khác"],
      ko: ["도메인 규칙 또는 수동 그룹", "다른 표현 또는 거리"],
    },
    text(
      "Repeat the analysis across seeds, samples, scales, and external tasks; useful structure should survive more than one attractive plot.",
      "Lặp phân tích qua seed, sample, scale và tác vụ ngoài; cấu trúc hữu ích phải sống sót qua nhiều hơn một biểu đồ đẹp.",
      "시드, 표본, 스케일, 외부 과업을 바꾸어 반복합니다. 유용한 구조는 보기 좋은 그림 하나 이상에서 살아남아야 합니다.",
    ),
    text(
      "Change course when the structure disappears under a reasonable representation change or has no stable connection to an external use.",
      "Đổi hướng khi cấu trúc biến mất dưới một thay đổi representation hợp lý hoặc không có liên hệ ổn định với mục đích bên ngoài.",
      "합리적인 표현 변경에서 구조가 사라지거나 외부 사용과 안정적으로 연결되지 않으면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /deep-learning|neural|graph-machine|convolution|recurrent|transformer|attention|autoencoder|generative|natural-language|nlp|vision/,
    text(
      "Use it when the input is high-dimensional or structured, simpler representations plateau, and data plus compute can support reliable training.",
      "Dùng khi đầu vào nhiều chiều hoặc có cấu trúc, representation đơn giản đã chững và dữ liệu cùng compute đủ cho huấn luyện đáng tin.",
      "입력이 고차원 또는 구조적이고 단순한 표현의 성능이 정체되며 데이터와 연산이 안정적 학습을 뒷받침할 때 사용합니다.",
    ),
    text(
      "Compare a pretrained or frozen representation and a task-specific shallow baseline before training a larger model end to end.",
      "So sánh representation pretrained hoặc frozen và baseline nông theo tác vụ trước khi train mô hình lớn end-to-end.",
      "큰 모델을 엔드투엔드로 학습하기 전에 사전학습·고정 표현과 과업별 얕은 기준선을 비교합니다.",
    ),
    {
      en: ["Pretrained frozen representation", "Task-specific shallow model"],
      vi: ["Representation pretrained được đóng băng", "Mô hình nông theo tác vụ"],
      ko: ["사전학습 고정 표현", "과업별 얕은 모델"],
    },
    text(
      "Evaluate unseen slices, calibration, robustness, latency, memory, and the stability of optimization—not only an aggregate score.",
      "Đánh giá slice chưa thấy, calibration, robustness, latency, memory và độ ổn định tối ưu—không chỉ điểm tổng hợp.",
      "집계 점수뿐 아니라 보지 못한 슬라이스, 보정, 강건성, 지연, 메모리, 최적화 안정성을 평가합니다.",
    ),
    text(
      "Change course when scaling adds cost without stable held-out value, failure slices remain unsafe, or the data cannot support the model capacity.",
      "Đổi hướng khi scaling tăng chi phí mà không có giá trị giữ lại ổn định, slice lỗi vẫn không an toàn hoặc dữ liệu không hỗ trợ capacity.",
      "스케일링이 안정적 홀드아웃 가치 없이 비용만 늘리거나 실패 슬라이스가 위험하거나 데이터가 모델 용량을 뒷받침하지 못하면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /bayes|probab|gaussian|likelihood|uncertainty|graphical/,
    text(
      "Use it when uncertainty changes the action and the prior, likelihood, and dependency assumptions can be stated and challenged.",
      "Dùng khi uncertainty làm thay đổi hành động và các giả định về prior, likelihood, dependency có thể được nêu và kiểm tra.",
      "불확실성이 행동을 바꾸며 사전분포·우도·의존 가정을 명시하고 검증할 수 있을 때 사용합니다.",
    ),
    text(
      "Compare posterior decisions with a point estimate, bootstrap interval, or simpler calibrated model.",
      "So sánh quyết định hậu nghiệm với point estimate, bootstrap interval hoặc mô hình calibration đơn giản hơn.",
      "사후 의사결정을 점추정, 부트스트랩 구간, 더 단순한 보정 모델과 비교합니다.",
    ),
    {
      en: ["Point estimate with sensitivity analysis", "Bootstrap or calibrated baseline"],
      vi: ["Point estimate kèm phân tích độ nhạy", "Bootstrap hoặc baseline đã calibration"],
      ko: ["민감도 분석을 포함한 점추정", "부트스트랩 또는 보정 기준선"],
    },
    text(
      "Check posterior predictive behavior, calibration, prior sensitivity, and whether missingness or dependence violates the model.",
      "Kiểm tra posterior predictive, calibration, độ nhạy prior và việc missingness hoặc dependence có vi phạm mô hình không.",
      "사후예측, 보정, 사전분포 민감도, 결측·의존 구조의 모형 위반 여부를 확인합니다.",
    ),
    text(
      "Change course when conclusions reverse under credible priors, predictive checks fail, or uncertainty is precise only because assumptions are too rigid.",
      "Đổi hướng khi kết luận đảo dưới prior hợp lý, predictive check thất bại hoặc uncertainty chỉ hẹp vì giả định quá cứng.",
      "타당한 사전분포에서 결론이 뒤집히거나 예측 점검이 실패하거나 경직된 가정 때문에 불확실성만 좁아지면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /reinforcement|robot|policy|reward|control/,
    text(
      "Use it only when actions affect later observations, delayed return matters, and exploration can be made safe enough.",
      "Chỉ dùng khi hành động ảnh hưởng quan sát về sau, lợi ích trễ quan trọng và exploration có thể đủ an toàn.",
      "행동이 이후 관측에 영향을 주고 지연 보상이 중요하며 탐색을 충분히 안전하게 만들 수 있을 때만 사용합니다.",
    ),
    text(
      "Compare with a fixed policy, supervised prediction plus a rule, and planning with a known simulator.",
      "So sánh với fixed policy, supervised prediction kèm rule và planning bằng simulator đã biết.",
      "고정 정책, 지도 예측과 규칙의 결합, 알려진 시뮬레이터 기반 계획과 비교합니다.",
    ),
    {
      en: ["Fixed policy or contextual rule", "Supervised prediction plus planning"],
      vi: ["Fixed policy hoặc quy tắc theo ngữ cảnh", "Supervised prediction kết hợp planning"],
      ko: ["고정 정책 또는 상황별 규칙", "지도 예측과 계획의 결합"],
    },
    text(
      "Evaluate return, constraint violations, off-policy uncertainty, simulator mismatch, and worst-case behavior before live exploration.",
      "Đánh giá return, vi phạm constraint, off-policy uncertainty, simulator mismatch và hành vi xấu nhất trước exploration thật.",
      "실환경 탐색 전에 수익, 제약 위반, 오프폴리시 불확실성, 시뮬레이터 불일치, 최악 행동을 평가합니다.",
    ),
    text(
      "Change course when the reward can be gamed, safe exploration is unavailable, or a simpler policy captures nearly all attainable value.",
      "Đổi hướng khi reward có thể bị lách, không thể exploration an toàn hoặc policy đơn giản đạt gần hết giá trị khả dụng.",
      "보상 해킹이 가능하거나 안전한 탐색이 불가능하거나 단순 정책이 거의 모든 가치를 얻으면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /data|feature|label|sampling|normalization|cleaning|visualization|ingestion|preprocess/,
    text(
      "Proceed only after defining the observation unit, decision time, collection mechanism, missing-value meaning, and label policy.",
      "Chỉ tiếp tục sau khi định nghĩa observation unit, decision time, collection mechanism, ý nghĩa missing value và label policy.",
      "관측 단위, 결정 시점, 수집 메커니즘, 결측 의미, 레이블 정책을 정의한 뒤에만 진행합니다.",
    ),
    text(
      "Compare the proposed representation with raw measurements and a minimal transformation fitted inside the training split.",
      "So sánh representation đề xuất với measurement thô và phép biến đổi tối thiểu được fit trong train split.",
      "제안한 표현을 원시 측정값 및 학습 분할 안에서 적합한 최소 변환과 비교합니다.",
    ),
    {
      en: ["Raw measurement baseline", "Minimal split-safe transformation"],
      vi: ["Baseline measurement thô", "Phép biến đổi tối thiểu an toàn theo split"],
      ko: ["원시 측정 기준선", "분할 안전 최소 변환"],
    },
    text(
      "Validate availability, lineage, missingness, and error rates by time, source, entity, and affected group.",
      "Thẩm định availability, lineage, missingness và error rate theo thời gian, nguồn, entity và nhóm bị ảnh hưởng.",
      "시간, 출처, 엔터티, 영향 집단별 이용 가능성, 계보, 결측, 오류율을 검증합니다.",
    ),
    text(
      "Change course when the feature is unavailable at decision time, the label changes meaning, or gains disappear under a leak-safe split.",
      "Đổi hướng khi feature chưa có tại decision time, label đổi ý nghĩa hoặc lợi ích biến mất dưới split chống leakage.",
      "특징이 결정 시점에 없거나 레이블 의미가 바뀌거나 누수 방지 분할에서 이득이 사라지면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /validation|evaluation|metric|confusion|roc|ranking|comparison|split|imbalance|overfit|underfit|bias-and-variance|fitting|regularization|selection|tuning|reproducib/,
    text(
      "Choose the procedure from the deployment claim, error costs, time direction, entity boundaries, and decision capacity.",
      "Chọn quy trình từ deployment claim, chi phí lỗi, hướng thời gian, ranh giới entity và capacity ra quyết định.",
      "배포 주장, 오류 비용, 시간 방향, 엔터티 경계, 의사결정 용량에서 절차를 선택합니다.",
    ),
    text(
      "Compare the chosen estimate with a trivial baseline and at least one split or metric that tests a plausible failure mode.",
      "So sánh estimate đã chọn với baseline đơn giản và ít nhất một split hoặc metric kiểm tra failure mode hợp lý.",
      "선택한 추정치를 단순 기준선 및 가능한 실패 모드를 시험하는 분할·지표 하나 이상과 비교합니다.",
    ),
    {
      en: ["Trivial operating baseline", "Alternative split or cost-aware metric"],
      vi: ["Baseline vận hành đơn giản", "Split hoặc metric theo chi phí khác"],
      ko: ["단순 운영 기준선", "대안 분할 또는 비용 기반 지표"],
    },
    text(
      "Report uncertainty, sample counts, temporal behavior, subgroup slices, and every choice that validation influenced.",
      "Báo cáo uncertainty, sample count, hành vi theo thời gian, subgroup slice và mọi lựa chọn bị validation ảnh hưởng.",
      "불확실성, 표본 수, 시간별 행동, 하위 집단 슬라이스, 검증이 영향을 준 모든 선택을 보고합니다.",
    ),
    text(
      "Change course when the split no longer mirrors use, the metric rewards the wrong error, or repeated choices have contaminated the final evidence.",
      "Đổi hướng khi split không còn phản ánh sử dụng, metric thưởng sai loại lỗi hoặc lựa chọn lặp lại đã làm nhiễm bằng chứng cuối.",
      "분할이 실제 사용을 반영하지 않거나 지표가 잘못된 오류를 보상하거나 반복 선택이 최종 근거를 오염시키면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /pipeline|training-process|training-loop|model-training|deployment|monitor|updating|workflow|production|system|feedback|scalab|project|real-world|debugging/,
    text(
      "Choose the design from an explicit service contract: inputs, outputs, owner, latency, cost, safety limits, fallback, and delayed outcomes.",
      "Chọn thiết kế từ service contract rõ ràng: input, output, owner, latency, cost, giới hạn an toàn, fallback và outcome đến trễ.",
      "입력, 출력, 책임자, 지연, 비용, 안전 한계, 대체 동작, 지연 결과를 명시한 서비스 계약에서 설계를 선택합니다.",
    ),
    text(
      "Compare the learned system with a rule-based fallback and the smallest architecture that can satisfy the contract.",
      "So sánh hệ thống học được với rule-based fallback và kiến trúc nhỏ nhất có thể đáp ứng contract.",
      "학습 시스템을 규칙 기반 대체 경로 및 계약을 만족하는 최소 아키텍처와 비교합니다.",
    ),
    {
      en: ["Rule-based fallback", "Smallest contract-satisfying system"],
      vi: ["Rule-based fallback", "Hệ thống nhỏ nhất đáp ứng contract"],
      ko: ["규칙 기반 대체 경로", "계약을 만족하는 최소 시스템"],
    },
    text(
      "Test delivery, rollback, schema changes, load, degraded dependencies, alert ownership, and delayed real-world outcomes.",
      "Kiểm thử delivery, rollback, schema change, load, dependency suy giảm, owner cảnh báo và outcome thực tế đến trễ.",
      "전달, 롤백, 스키마 변경, 부하, 의존성 저하, 경보 책임, 지연된 현실 결과를 시험합니다.",
    ),
    text(
      "Change course when the system cannot fail safely, monitoring lacks an owner, or operating complexity costs more than the decision is worth.",
      "Đổi hướng khi hệ thống không thể fail an toàn, monitoring không có owner hoặc độ phức tạp vận hành tốn hơn giá trị quyết định.",
      "시스템이 안전하게 실패할 수 없거나 모니터링 책임자가 없거나 운영 복잡도가 의사결정 가치보다 크면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /pitfall|leakage|bad-split|over-engineering|misuse|error-analysis/,
    text(
      "Begin with the observed symptom, then reconstruct the path from raw data through choices to the reported result.",
      "Bắt đầu từ triệu chứng quan sát rồi dựng lại đường đi từ dữ liệu thô qua các lựa chọn đến kết quả báo cáo.",
      "관측된 증상에서 시작해 원시 데이터부터 선택과 보고 결과까지의 경로를 재구성합니다.",
    ),
    text(
      "Compare the current result with a leak-safe split, a suspicious-feature ablation, and a trivial baseline before adding complexity.",
      "So sánh kết quả hiện tại với split chống leakage, ablation feature đáng ngờ và baseline đơn giản trước khi thêm phức tạp.",
      "복잡도를 더하기 전에 현재 결과를 누수 방지 분할, 의심 특징 제거, 단순 기준선과 비교합니다.",
    ),
    {
      en: ["Leak-safe replay", "One-variable ablation"],
      vi: ["Replay chống leakage", "Ablation một biến"],
      ko: ["누수 방지 재현", "단일 변수 제거 실험"],
    },
    text(
      "Run one falsification at a time and add a regression guard only after the failure mechanism is reproduced.",
      "Chạy từng phép falsification và chỉ thêm regression guard sau khi tái hiện được cơ chế lỗi.",
      "한 번에 하나의 반증 실험을 수행하고 실패 메커니즘을 재현한 뒤 회귀 방지 검사를 추가합니다.",
    ),
    text(
      "Change course when the apparent gain vanishes after removing leakage, respecting time or groups, or replaying an older period.",
      "Đổi hướng khi lợi ích biểu kiến biến mất sau khi bỏ leakage, tôn trọng time/group hoặc replay giai đoạn cũ.",
      "누수를 제거하고 시간·그룹을 지키거나 과거 기간을 재현했을 때 겉보기 이득이 사라지면 방향을 바꿉니다.",
    ),
  ),
  profile(
    /.*/,
    text(
      "Use this idea only after connecting it to a concrete question, available evidence, and an action that can change.",
      "Chỉ dùng ý tưởng này sau khi nối nó với câu hỏi cụ thể, bằng chứng sẵn có và hành động có thể thay đổi.",
      "이 개념을 구체적 질문, 이용 가능한 근거, 바꿀 수 있는 행동과 연결한 뒤에만 사용합니다.",
    ),
    text(
      "Compare it with doing nothing, a transparent rule, and the simplest concept that answers the same question.",
      "So sánh với không làm gì, một quy tắc minh bạch và khái niệm đơn giản nhất trả lời cùng câu hỏi.",
      "아무것도 하지 않기, 투명한 규칙, 같은 질문에 답하는 가장 단순한 개념과 비교합니다.",
    ),
    {
      en: ["Do-nothing baseline", "Transparent rule or simpler concept"],
      vi: ["Baseline không hành động", "Quy tắc minh bạch hoặc khái niệm đơn giản hơn"],
      ko: ["무행동 기준선", "투명한 규칙 또는 더 단순한 개념"],
    },
    text(
      "Define an observation that would support the conclusion and another that would contradict it.",
      "Định nghĩa một quan sát hỗ trợ kết luận và một quan sát khác có thể bác bỏ nó.",
      "결론을 지지할 관측과 반박할 관측을 각각 정의합니다.",
    ),
    text(
      "Change course when the result does not alter a real decision, a simpler alternative performs as well, or the assumptions cannot be checked.",
      "Đổi hướng khi kết quả không thay đổi quyết định thật, phương án đơn giản hoạt động tương đương hoặc không thể kiểm tra giả định.",
      "결과가 실제 결정을 바꾸지 못하거나 단순 대안이 같은 성능을 내거나 가정을 점검할 수 없으면 방향을 바꿉니다.",
    ),
  ),
];

const labels: Record<DepthLanguage, {
  question: (title: string) => string;
  frame: string;
  framePrompt: string;
  gate: string;
  gatePrompt: string;
  compare: string;
  comparePrompt: string;
  verify: string;
  verifyPrompt: string;
}> = {
  en: {
    question: (title) => `When should ${title} influence a real decision?`,
    frame: "Frame",
    framePrompt: "What decision needs help?",
    gate: "Check fit",
    gatePrompt: "Which assumptions must hold?",
    compare: "Compare",
    comparePrompt: "What else could solve it?",
    verify: "Verify",
    verifyPrompt: "What evidence earns trust?",
  },
  vi: {
    question: (title) => `Khi nào ${title} nên ảnh hưởng một quyết định thực tế?`,
    frame: "Định khung",
    framePrompt: "Quyết định nào cần hỗ trợ?",
    gate: "Kiểm tra phù hợp",
    gatePrompt: "Giả định nào phải đúng?",
    compare: "So sánh",
    comparePrompt: "Phương án nào khác có thể giải quyết?",
    verify: "Xác minh",
    verifyPrompt: "Bằng chứng nào đủ để tin?",
  },
  ko: {
    question: (title) => `${title}은(는) 언제 실제 의사결정에 영향을 주어야 할까요?`,
    frame: "문제 정의",
    framePrompt: "어떤 결정을 도와야 하나요?",
    gate: "적합성 점검",
    gatePrompt: "어떤 가정이 성립해야 하나요?",
    compare: "대안 비교",
    comparePrompt: "다른 해결책은 무엇인가요?",
    verify: "검증",
    verifyPrompt: "어떤 근거가 신뢰를 얻나요?",
  },
};

export function getDecisionGuide(
  language: DepthLanguage,
  seed: CurriculumSeed,
  depth: TopicDepth,
): DecisionGuide {
  const searchable = `${seed.slug} ${seed.tags.join(" ")}`.toLowerCase();
  const shiftProfile = profiles.find((item) => item.match.source.startsWith("distribution-shift"));
  const graphProfile = profiles.find((item) => item.match.source.startsWith("graph-machine"));
  const deepProfile = profiles.find((item) => item.match.source.startsWith("deep-learning"));
  const evaluationProfile = profiles.find((item) => item.match.source.startsWith("validation"));
  const dataProfile = profiles.find((item) => item.match.source.startsWith("data|"));
  const systemProfile = profiles.find((item) => item.match.source.startsWith("pipeline"));
  const pitfallProfile = profiles.find((item) => item.match.source.startsWith("pitfall"));
  const fallbackProfile = profiles.at(-1)!;
  const evaluationSlug = /^(?:data-splitting|why-validation|cross-validation|model-selection|hyperparameter-tuning|data-imbalance|reproducibility|why-evaluation-matters|classification-metrics|confusion-matrix|roc-auc|regression-metrics|ranking-metrics|model-comparison|real-world-evaluation|fitting-concepts|bias-and-variance|overfitting-detection|underfitting-detection|regularization-review|data-vs-model|practical-fitting-solutions|model-evaluation|model-selection-strategy)$/;
  const systemSlug = /^(?:training-process-overview|ml-problem-formulation|real-world-ml-examples|training-loop|ml-pipeline-overview|model-training|model-deployment|model-monitoring|model-updating|end-to-end-project|part-g-practical-ml-system-design|system-thinking|feedback-loop|production-considerations|scalability|real-world-case-study|debugging-strategies|projects)$/;
  const selected = shiftProfile?.match.test(searchable)
    ? shiftProfile
    : systemSlug.test(seed.slug) && systemProfile
      ? systemProfile
      : pitfallProfile?.match.test(searchable)
        ? pitfallProfile
        : /types-of-learning|learning-approaches|part-a-what-is-machine-learning/.test(seed.slug)
          ? fallbackProfile
          : graphProfile?.match.test(searchable)
            ? graphProfile
            : evaluationSlug.test(seed.slug) && evaluationProfile
              ? evaluationProfile
              : deepProfile?.match.test(searchable)
                ? deepProfile
                : /^(?:data-|feature-|label-|what-is-data)/.test(seed.slug) && dataProfile
                  ? dataProfile
                  : profiles.find((item) => item.match.test(searchable))!;
  const copy = labels[language];
  const title = seed.titles[language];

  return {
    question:
      selected === pitfallProfile || selected === shiftProfile
        ? language === "vi"
          ? `${title} nên thay đổi quyết định tiếp theo như thế nào?`
          : language === "ko"
            ? `${title}은(는) 다음 의사결정을 어떻게 바꾸어야 할까요?`
            : `How should ${title} change the next decision?`
        : copy.question(title),
    steps: [
      {
        label: copy.frame,
        prompt: copy.framePrompt,
        action: depth.core[language],
      },
      {
        label: copy.gate,
        prompt: copy.gatePrompt,
        action: selected.gate[language],
      },
      {
        label: copy.compare,
        prompt: copy.comparePrompt,
        action: selected.comparison[language],
      },
      {
        label: copy.verify,
        prompt: copy.verifyPrompt,
        action: `${selected.evidence[language]} ${depth.example[language]}`,
      },
    ],
    alternatives: selected.alternatives[language],
    reconsider: selected.reconsider[language],
  };
}

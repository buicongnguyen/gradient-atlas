import type { CurriculumSeed } from "./full-curriculum";
import { fundamentalsTopicDepth } from "./topic-depth-fundamentals.ts";
import { legacyTopicDepth } from "./topic-depth-legacy.ts";
import type { DepthLanguage, LocalizedDepthText, TopicDepth } from "./topic-depth-types.ts";

export const topicDepthBySlug: Record<string, TopicDepth> = {
  ...legacyTopicDepth,
  ...fundamentalsTopicDepth,
};

type LearningProfile = {
  match: RegExp;
  mechanism: LocalizedDepthText;
  caution: LocalizedDepthText;
  steps: Record<DepthLanguage, [string, string, string, string]>;
};

const profile = (
  match: RegExp,
  mechanism: [string, string, string],
  caution: [string, string, string],
  steps: Record<DepthLanguage, [string, string, string, string]>,
): LearningProfile => ({
  match,
  mechanism: { en: mechanism[0], vi: mechanism[1], ko: mechanism[2] },
  caution: { en: caution[0], vi: caution[1], ko: caution[2] },
  steps,
});

const learningProfiles: LearningProfile[] = [
  profile(
    /deep-learning|neural|perceptron|convolution|recurrent|transformer|attention|autoencoder|generative|nlp|vision/,
    [
      "Represent the input as tensors, compose differentiable layers, compute a task loss, and use backpropagation to assign each parameter a local share of the error.",
      "Biểu diễn đầu vào bằng tensor, ghép các tầng khả vi, tính hàm mất mát của tác vụ rồi dùng lan truyền ngược để phân bổ phần sai số cho từng tham số.",
      "입력을 텐서로 표현하고 미분 가능한 층을 연결한 뒤 과업 손실을 계산하고 역전파로 각 매개변수의 오차 기여를 구합니다.",
    ],
    [
      "More layers do not guarantee better learning: inspect data coverage, optimization stability, held-out behavior, compute cost, and failure slices together.",
      "Nhiều tầng hơn không bảo đảm học tốt hơn: cần xem đồng thời độ bao phủ dữ liệu, độ ổn định tối ưu, hành vi trên dữ liệu giữ lại, chi phí tính toán và các nhóm lỗi.",
      "층이 많다고 학습이 좋아지는 것은 아닙니다. 데이터 범위, 최적화 안정성, 홀드아웃 성능, 계산 비용, 실패 슬라이스를 함께 확인하세요.",
    ],
    {
      en: ["Choose the representation", "Define the forward computation", "Optimize on training data", "Test on unseen slices"],
      vi: ["Chọn cách biểu diễn", "Định nghĩa phép tính thuận", "Tối ưu trên dữ liệu train", "Kiểm tra trên các nhóm chưa thấy"],
      ko: ["표현을 선택합니다", "순전파 계산을 정의합니다", "학습 데이터에서 최적화합니다", "보지 못한 슬라이스를 평가합니다"],
    },
  ),
  profile(
    /reinforcement|robot|policy|reward|control/,
    [
      "Model a sequence of state, action, reward, and next state. Learning estimates which actions improve long-run return while still collecting enough information to correct the policy.",
      "Mô hình hóa chuỗi trạng thái, hành động, phần thưởng và trạng thái kế tiếp. Quá trình học ước lượng hành động nào cải thiện lợi ích dài hạn đồng thời vẫn thu đủ thông tin để sửa chính sách.",
      "상태, 행동, 보상, 다음 상태의 연속 과정을 모델링합니다. 학습은 장기 수익을 높이는 행동을 추정하면서 정책을 고칠 만큼의 정보도 수집합니다.",
    ],
    [
      "A reward is only a proxy. Test for unsafe exploration, delayed effects, reward hacking, simulator mismatch, and policies that exploit an omitted constraint.",
      "Phần thưởng chỉ là biến đại diện. Hãy kiểm tra thăm dò không an toàn, hiệu ứng trễ, lách hàm thưởng, sai lệch mô phỏng và chính sách khai thác ràng buộc bị bỏ sót.",
      "보상은 대리 목표일 뿐입니다. 위험한 탐색, 지연 효과, 보상 해킹, 시뮬레이터 불일치, 누락된 제약을 악용하는 정책을 점검하세요.",
    ],
    {
      en: ["Define state and actions", "Specify reward and constraints", "Learn from transitions", "Evaluate return and safety"],
      vi: ["Định nghĩa trạng thái và hành động", "Đặt phần thưởng và ràng buộc", "Học từ các chuyển tiếp", "Đánh giá lợi ích và an toàn"],
      ko: ["상태와 행동을 정의합니다", "보상과 제약을 지정합니다", "전이에서 학습합니다", "수익과 안전을 평가합니다"],
    },
  ),
  profile(
    /bayes|probab|gaussian|likelihood|uncertainty|graphical/,
    [
      "Write a probability model for observed and hidden quantities, combine prior assumptions with a likelihood, then use the posterior or posterior predictive distribution for decisions.",
      "Viết mô hình xác suất cho đại lượng quan sát và ẩn, kết hợp giả định tiên nghiệm với hàm khả năng rồi dùng phân phối hậu nghiệm hoặc dự báo hậu nghiệm để ra quyết định.",
      "관측 변수와 잠재 변수의 확률 모형을 쓰고 사전 가정과 우도를 결합한 뒤 사후분포 또는 사후예측분포로 의사결정합니다.",
    ],
    [
      "Uncertainty is useful only when the model family and observation process are credible. Check calibration, prior sensitivity, missing mechanisms, and approximate-inference error.",
      "Bất định chỉ hữu ích khi họ mô hình và quá trình quan sát đáng tin. Cần kiểm tra calibration, độ nhạy với tiên nghiệm, cơ chế thiếu dữ liệu và sai số suy luận xấp xỉ.",
      "모형 계열과 관측 과정이 타당할 때만 불확실성이 의미 있습니다. 보정, 사전분포 민감도, 결측 메커니즘, 근사 추론 오차를 확인하세요.",
    ],
    {
      en: ["State random variables", "Factor the joint model", "Condition on observations", "Check posterior predictions"],
      vi: ["Nêu các biến ngẫu nhiên", "Phân rã phân phối chung", "Điều kiện hóa theo quan sát", "Kiểm tra dự báo hậu nghiệm"],
      ko: ["확률변수를 정합니다", "결합분포를 분해합니다", "관측값으로 조건화합니다", "사후예측을 점검합니다"],
    },
  ),
  profile(
    /cluster|unsupervised|dimensional|dictionary|anomaly|association|feature-learning|self-supervised|embedding/,
    [
      "Choose a representation and a notion of similarity, then search for structure without using the final task label. Validate the discovered structure against stability or an external use case.",
      "Chọn cách biểu diễn và khái niệm tương đồng, sau đó tìm cấu trúc mà không dùng nhãn cuối của tác vụ. Thẩm định cấu trúc bằng độ ổn định hoặc một mục đích bên ngoài.",
      "표현과 유사도 정의를 고른 뒤 최종 과업 레이블 없이 구조를 찾습니다. 발견한 구조는 안정성이나 외부 사용 목적에 비추어 검증합니다.",
    ],
    [
      "An attractive plot is not evidence that the structure is real. Repeat the analysis across scales, seeds, samples, and alternative distance choices.",
      "Biểu đồ đẹp không chứng minh cấu trúc là thật. Hãy lặp phân tích với nhiều thang đo, hạt giống, mẫu và lựa chọn khoảng cách khác nhau.",
      "보기 좋은 그림이 실제 구조의 증거는 아닙니다. 스케일, 난수 시드, 표본, 거리 정의를 바꾸어 분석을 반복하세요.",
    ],
    {
      en: ["Prepare a representation", "Choose similarity or reconstruction", "Fit latent structure", "Test stability and usefulness"],
      vi: ["Chuẩn bị biểu diễn", "Chọn độ tương đồng hoặc tái tạo", "Khớp cấu trúc ẩn", "Kiểm tra độ ổn định và hữu ích"],
      ko: ["표현을 준비합니다", "유사도나 재구성을 고릅니다", "잠재 구조를 적합합니다", "안정성과 유용성을 검증합니다"],
    },
  ),
  profile(
    /linear-regression|logistic|decision-tree|support-vector|naive-bayes|ensemble|genetic|regression-analysis|model-vs|parametric|model-complexity/,
    [
      "Specify the model's hypothesis space and objective, fit its parameters on training data, then inspect both predictive error and the assumptions that give the fitted parameters meaning.",
      "Xác định không gian giả thuyết và hàm mục tiêu của mô hình, khớp tham số trên dữ liệu train rồi kiểm tra cả sai số dự báo lẫn các giả định tạo ý nghĩa cho tham số đã khớp.",
      "모형의 가설 공간과 목적함수를 정하고 학습 데이터에서 매개변수를 적합한 뒤 예측 오차와 적합된 매개변수의 해석을 가능하게 하는 가정을 함께 점검합니다.",
    ],
    [
      "Compare against a simple baseline and evaluate sensitivity to preprocessing, regularization, hyperparameters, and the sampling scheme before trusting an apparent gain.",
      "So sánh với đường cơ sở đơn giản và đánh giá độ nhạy với tiền xử lý, điều chuẩn, siêu tham số và cách lấy mẫu trước khi tin vào mức cải thiện quan sát được.",
      "겉으로 보이는 향상을 믿기 전에 단순 기준선과 비교하고 전처리, 정규화, 하이퍼파라미터, 표본 추출 방식에 대한 민감도를 평가하세요.",
    ],
    {
      en: ["Define inputs and target", "Fit the objective", "Inspect residual errors", "Compare on held-out data"],
      vi: ["Định nghĩa đầu vào và mục tiêu", "Khớp hàm mục tiêu", "Xem sai số phần dư", "So sánh trên dữ liệu giữ lại"],
      ko: ["입력과 목표를 정합니다", "목적함수를 적합합니다", "잔차 오차를 살핍니다", "홀드아웃 데이터에서 비교합니다"],
    },
  ),
  profile(
    /data|feature|label|sampling|normalization|cleaning|visualization|ingestion|preprocess/,
    [
      "Treat every row as the result of a measurement and collection process. Define the observation unit, availability time, missing-value meaning, transformation ownership, and label policy before fitting a model.",
      "Xem mỗi hàng là kết quả của một quá trình đo và thu thập. Trước khi khớp mô hình, hãy định nghĩa đơn vị quan sát, thời điểm sẵn có, ý nghĩa giá trị thiếu, chủ sở hữu phép biến đổi và chính sách nhãn.",
      "각 행을 측정·수집 과정의 결과로 봅니다. 모델을 적합하기 전에 관측 단위, 이용 가능 시점, 결측의 의미, 변환 책임자, 레이블 정책을 정의하세요.",
    ],
    [
      "Fit data-dependent transformations inside the training split, preserve raw lineage, and inspect missingness and error rates by time, source, and affected group.",
      "Khớp các phép biến đổi phụ thuộc dữ liệu bên trong tập train, giữ dòng dõi dữ liệu thô và xem tỷ lệ thiếu cùng sai số theo thời gian, nguồn và nhóm bị ảnh hưởng.",
      "데이터 의존 변환은 학습 분할 안에서 적합하고 원시 데이터 계보를 보존하며 시간·출처·영향 집단별 결측률과 오류율을 점검하세요.",
    ],
    {
      en: ["Define the observation", "Audit collection and timing", "Transform inside the split", "Validate by source and slice"],
      vi: ["Định nghĩa quan sát", "Kiểm tra thu thập và thời điểm", "Biến đổi bên trong phép chia", "Thẩm định theo nguồn và nhóm"],
      ko: ["관측 단위를 정의합니다", "수집과 시점을 점검합니다", "분할 내부에서 변환합니다", "출처와 슬라이스별로 검증합니다"],
    },
  ),
  profile(
    /validation|evaluation|metric|confusion|roc|ranking|comparison|split|imbalance|overfit|underfit|bias-and-variance|fitting|selection|tuning|reproducib/,
    [
      "Separate estimation, model choice, and final evidence. Select splits and metrics from the deployment setting and error costs, then retain an untouched evaluation set for the final claim.",
      "Tách ước lượng, chọn mô hình và bằng chứng cuối. Chọn phép chia cùng chỉ số từ bối cảnh triển khai và chi phí lỗi, rồi giữ một tập đánh giá chưa động đến cho kết luận cuối.",
      "추정, 모델 선택, 최종 근거를 분리합니다. 배포 환경과 오류 비용에 맞춰 분할과 지표를 고르고 마지막 주장에는 손대지 않은 평가 세트를 사용합니다.",
    ],
    [
      "Report uncertainty and slice-level behavior. A single average can hide rare-class failure, temporal decay, duplicate leakage, or a threshold that exceeds operational capacity.",
      "Báo cáo bất định và hành vi theo nhóm. Một số trung bình có thể che lỗi ở lớp hiếm, suy giảm theo thời gian, rò rỉ do bản ghi trùng hoặc ngưỡng vượt quá năng lực vận hành.",
      "불확실성과 슬라이스별 성능을 보고하세요. 평균 하나는 희소 클래스 실패, 시간 경과 성능 저하, 중복 누수, 운영 용량을 넘는 임곗값을 감출 수 있습니다.",
    ],
    {
      en: ["Define the claim", "Mirror deployment in the split", "Choose cost-aware metrics", "Report uncertainty and slices"],
      vi: ["Định nghĩa kết luận", "Mô phỏng triển khai trong phép chia", "Chọn chỉ số theo chi phí", "Báo cáo bất định và nhóm"],
      ko: ["주장을 정의합니다", "배포 환경을 분할에 반영합니다", "비용 기반 지표를 고릅니다", "불확실성과 슬라이스를 보고합니다"],
    },
  ),
  profile(
    /pipeline|training-process|training-loop|model-training|deployment|monitor|updating|workflow|production|system|feedback|scalab|project|real-world|debugging/,
    [
      "Turn the model into a versioned decision service with explicit contracts for data, features, artifacts, thresholds, latency, fallback behavior, ownership, and delayed outcomes.",
      "Biến mô hình thành dịch vụ quyết định có phiên bản với hợp đồng rõ ràng cho dữ liệu, đặc trưng, artifact, ngưỡng, độ trễ, phương án dự phòng, trách nhiệm và kết quả đến muộn.",
      "모델을 데이터·특징·아티팩트·임곗값·지연·대체 동작·책임자·지연 도착 결과에 대한 명시적 계약을 가진 버전 관리 의사결정 서비스로 만듭니다.",
    ],
    [
      "Test rollback and fallback paths before launch. Monitor schema, feature distributions, decisions, latency, resource use, and eventually observed outcomes with named owners.",
      "Kiểm thử đường rollback và dự phòng trước khi chạy. Giám sát schema, phân phối đặc trưng, quyết định, độ trễ, tài nguyên và cuối cùng là kết quả quan sát được, với người chịu trách nhiệm rõ ràng.",
      "출시 전에 롤백과 대체 경로를 시험하세요. 담당자를 지정하고 스키마, 특징 분포, 의사결정, 지연, 자원 사용량, 최종 관측 결과를 모니터링합니다.",
    ],
    {
      en: ["Write system contracts", "Version data and artifacts", "Test delivery and fallback", "Monitor outcomes and update safely"],
      vi: ["Viết hợp đồng hệ thống", "Đặt phiên bản cho dữ liệu và artifact", "Kiểm thử triển khai và dự phòng", "Giám sát kết quả và cập nhật an toàn"],
      ko: ["시스템 계약을 작성합니다", "데이터와 아티팩트를 버전 관리합니다", "전달과 대체 경로를 시험합니다", "결과를 모니터링하고 안전하게 갱신합니다"],
    },
  ),
  profile(
    /pitfall|leakage|bad-split|over-engineering|misuse|distribution-shift/,
    [
      "Reconstruct the full path from raw observation to reported metric and ask where information, selection, or operational feedback could make the measured task easier than the deployed task.",
      "Dựng lại toàn bộ đường đi từ quan sát thô đến chỉ số báo cáo và hỏi xem thông tin, lựa chọn hoặc phản hồi vận hành có thể làm tác vụ đo lường dễ hơn tác vụ triển khai ở đâu.",
      "원시 관측에서 보고 지표까지의 전체 경로를 재구성하고 정보·선택·운영 피드백이 측정 과업을 실제 배포 과업보다 쉽게 만드는 지점을 찾습니다.",
    ],
    [
      "Prefer a small falsification test: move the split boundary, remove a suspicious feature, compare with a trivial baseline, or replay an older period before adding complexity.",
      "Ưu tiên phép thử bác bỏ nhỏ: dịch ranh giới chia dữ liệu, bỏ đặc trưng đáng ngờ, so với đường cơ sở đơn giản hoặc phát lại giai đoạn cũ trước khi thêm độ phức tạp.",
      "복잡도를 더하기 전에 분할 경계를 옮기고, 의심스러운 특징을 제거하고, 단순 기준선과 비교하거나 과거 기간을 재현하는 작은 반증 실험을 우선하세요.",
    ],
    {
      en: ["Reproduce the symptom", "Trace data and decisions", "Run one falsification", "Add a regression guard"],
      vi: ["Tái hiện triệu chứng", "Lần theo dữ liệu và quyết định", "Chạy một phép thử bác bỏ", "Thêm kiểm tra hồi quy"],
      ko: ["증상을 재현합니다", "데이터와 결정을 추적합니다", "반증 실험 하나를 실행합니다", "회귀 방지 검사를 추가합니다"],
    },
  ),
  profile(
    /.*/,
    [
      "Place the concept inside a complete learning loop: define the question, represent the evidence, carry out the operation, and check whether the result supports a real decision.",
      "Đặt khái niệm vào một vòng học hoàn chỉnh: định nghĩa câu hỏi, biểu diễn bằng chứng, thực hiện thao tác và kiểm tra liệu kết quả có hỗ trợ quyết định thật hay không.",
      "개념을 완전한 학습 고리 안에 둡니다. 질문을 정의하고 근거를 표현하며 연산을 수행한 뒤 결과가 실제 의사결정을 지지하는지 확인합니다.",
    ],
    [
      "Keep the scope explicit and compare the result with a simple alternative. Record what observation would make you revise the conclusion.",
      "Giữ phạm vi rõ ràng và so kết quả với một phương án đơn giản. Ghi lại quan sát nào sẽ khiến bạn sửa kết luận.",
      "범위를 명확히 하고 단순한 대안과 결과를 비교하세요. 어떤 관측이 결론을 바꾸게 할지 기록합니다.",
    ],
    {
      en: ["Define the question", "Build a minimal example", "Inspect the result", "State the limits"],
      vi: ["Định nghĩa câu hỏi", "Tạo ví dụ tối thiểu", "Xem kết quả", "Nêu giới hạn"],
      ko: ["질문을 정의합니다", "최소 예제를 만듭니다", "결과를 살핍니다", "한계를 밝힙니다"],
    },
  ),
];

export function getLearningProfile(seed: CurriculumSeed): LearningProfile {
  const searchable = `${seed.slug} ${seed.tags.join(" ")}`.toLowerCase();
  const priorityProfiles: Array<[RegExp, number]> = [
    [/pitfall|leakage|bad-split|over-engineering|misuse|distribution-shift/, 8],
    [/validation|evaluation|metric|confusion|roc|ranking|comparison|split|imbalance|overfit|underfit|bias-and-variance|fitting|selection|tuning|reproducib/, 6],
    [/pipeline|training-process|training-loop|model-training|deployment|monitor|updating|workflow|production|system|feedback|scalab|project|real-world|debugging|ingestion|preprocess/, 7],
  ];
  const priority = priorityProfiles.find(([matcher]) => matcher.test(searchable));
  if (priority) return learningProfiles[priority[1]];
  return learningProfiles.find((item) => item.match.test(searchable))!;
}

export function getTopicDepth(seed: CurriculumSeed): TopicDepth | undefined {
  return topicDepthBySlug[seed.slug];
}

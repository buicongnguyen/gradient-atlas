import type { CSSProperties, ReactNode } from "react";
import type { Language } from "../data/content";

const diagramSlugs = [
  "data-leakage",
  "train-validation-and-test",
  "confusion-matrix",
  "linear-regression",
  "bias-variance-and-overfitting",
  "end-to-end-ml-workflow",
  "types-of-learning",
  "supervised-learning",
  "clustering",
  "artificial-neural-networks",
  "decision-trees",
  "cross-validation",
  "roc-auc",
  "distribution-shift",
  "reinforcement-learning",
  "ensemble-learning",
  "dimensionality-reduction-and-metric-learning",
  "graph-machine-learning",
  "support-vector-machines",
  "training-loop",
  "data-imbalance",
  "concept-map",
] as const;

type DiagramSlug = (typeof diagramSlugs)[number];

type DiagramCopy = {
  title: string;
  description: string;
  labels: string[];
};

const copy: Record<DiagramSlug, Record<Language, DiagramCopy>> = {
  "data-leakage": {
    en: {
      title: "Decision-time boundary",
      description: "A timeline showing that only information available before a decision is a valid feature; later outcomes create target leakage.",
      labels: ["Observed history", "Available feature", "Decision time", "Future outcome", "Target leakage"],
    },
    vi: {
      title: "Ranh giới tại thời điểm quyết định",
      description: "Dòng thời gian cho thấy chỉ thông tin có trước quyết định mới là đặc trưng hợp lệ; kết quả xuất hiện sau đó gây rò rỉ mục tiêu.",
      labels: ["Lịch sử quan sát", "Đặc trưng sẵn có", "Thời điểm quyết định", "Kết quả tương lai", "Rò rỉ mục tiêu"],
    },
    ko: {
      title: "의사결정 시점의 경계",
      description: "의사결정 전에 이용할 수 있는 정보만 유효한 특징이며 이후 결과를 쓰면 타깃 누수가 생기는 시간선입니다.",
      labels: ["관측 기록", "이용 가능한 특징", "의사결정 시점", "미래 결과", "타깃 누수"],
    },
  },
  "train-validation-and-test": {
    en: {
      title: "Three partitions, three responsibilities",
      description: "A dataset split into training for fitting, validation for choosing, and test for one final claim.",
      labels: ["Training · 60%", "Fit parameters", "Validation · 20%", "Choose settings", "Test · 20%", "Report once"],
    },
    vi: {
      title: "Ba tập dữ liệu, ba trách nhiệm",
      description: "Tập dữ liệu được chia thành tập huấn luyện để khớp tham số, tập thẩm định để lựa chọn và tập kiểm thử cho tuyên bố cuối cùng.",
      labels: ["Huấn luyện · 60%", "Khớp tham số", "Thẩm định · 20%", "Chọn cấu hình", "Kiểm thử · 20%", "Báo cáo một lần"],
    },
    ko: {
      title: "세 파티션과 세 가지 책임",
      description: "매개변수 적합용 학습셋, 선택용 검증셋, 마지막 주장용 테스트셋으로 데이터를 나눈 그림입니다.",
      labels: ["학습 · 60%", "매개변수 적합", "검증 · 20%", "설정 선택", "테스트 · 20%", "한 번 보고"],
    },
  },
  "confusion-matrix": {
    en: {
      title: "Every prediction enters one cell",
      description: "A two-by-two confusion matrix crossing predicted class with actual class.",
      labels: ["Actual +", "Actual −", "Predicted +", "Predicted −", "TP", "FP", "FN", "TN"],
    },
    vi: {
      title: "Mỗi dự đoán thuộc đúng một ô",
      description: "Ma trận nhầm lẫn hai nhân hai đối chiếu lớp được dự đoán với lớp thực tế.",
      labels: ["Thực tế +", "Thực tế −", "Dự đoán +", "Dự đoán −", "TP", "FP", "FN", "TN"],
    },
    ko: {
      title: "모든 예측은 한 칸에만 속합니다",
      description: "예측 클래스와 실제 클래스를 교차한 2×2 혼동행렬입니다.",
      labels: ["실제 +", "실제 −", "예측 +", "예측 −", "TP", "FP", "FN", "TN"],
    },
  },
  "linear-regression": {
    en: {
      title: "A fitted line summarizes a trend",
      description: "Observed points around a fitted line; vertical residuals show what the linear model does not explain.",
      labels: ["Observed data", "Fitted line", "Residual", "x", "y"],
    },
    vi: {
      title: "Đường khớp tóm tắt xu hướng",
      description: "Các điểm quan sát nằm quanh đường hồi quy; phần dư theo phương dọc biểu diễn phần mô hình tuyến tính chưa giải thích.",
      labels: ["Dữ liệu quan sát", "Đường hồi quy", "Phần dư", "x", "y"],
    },
    ko: {
      title: "적합선은 추세를 요약합니다",
      description: "관측점 주위의 적합선과 세로 잔차로 선형모델이 설명하지 못한 부분을 나타냅니다.",
      labels: ["관측 데이터", "적합선", "잔차", "x", "y"],
    },
  },
  "bias-variance-and-overfitting": {
    en: {
      title: "Read the train–validation gap",
      description: "Three error profiles compare underfitting, healthy generalization, and overfitting.",
      labels: ["Underfit", "Healthy", "Overfit", "Train error", "Validation error", "large together", "small together", "large gap"],
    },
    vi: {
      title: "Đọc khoảng cách huấn luyện–thẩm định",
      description: "Ba cấu hình sai số so sánh thiếu khớp, khái quát hóa tốt và quá khớp.",
      labels: ["Thiếu khớp", "Tốt", "Quá khớp", "Lỗi huấn luyện", "Lỗi thẩm định", "cùng cao", "cùng thấp", "khoảng cách lớn"],
    },
    ko: {
      title: "학습–검증 간극 읽기",
      description: "과소적합, 건강한 일반화, 과적합의 세 가지 오차 패턴을 비교합니다.",
      labels: ["과소적합", "건강함", "과적합", "학습 오차", "검증 오차", "둘 다 큼", "둘 다 작음", "큰 간극"],
    },
  },
  "end-to-end-ml-workflow": {
    en: {
      title: "A workflow with feedback, not a conveyor belt",
      description: "An end-to-end machine-learning loop from problem definition through monitoring and back to evidence.",
      labels: ["Define", "Collect", "Split", "Train", "Evaluate", "Deploy", "Monitor", "New evidence updates the problem"],
    },
    vi: {
      title: "Quy trình có phản hồi, không phải băng chuyền",
      description: "Vòng lặp học máy đầu-cuối từ xác định bài toán, thu thập dữ liệu, đánh giá, triển khai đến giám sát và quay lại bằng chứng.",
      labels: ["Xác định", "Thu thập", "Chia dữ liệu", "Huấn luyện", "Đánh giá", "Triển khai", "Giám sát", "Bằng chứng mới cập nhật bài toán"],
    },
    ko: {
      title: "컨베이어 벨트가 아닌 피드백 워크플로",
      description: "문제 정의부터 수집, 평가, 배포, 모니터링을 거쳐 새로운 근거로 돌아오는 엔드투엔드 머신러닝 순환입니다.",
      labels: ["정의", "수집", "분할", "학습", "평가", "배포", "모니터링", "새 근거가 문제를 갱신"],
    },
  },
  "types-of-learning": {
    en: {
      title: "The learning signal defines the family",
      description: "A taxonomy branching from the available learning signal into supervised, unsupervised, self-supervised, and reinforcement learning.",
      labels: ["Learning signal", "Supervised", "Human labels", "Unsupervised", "Data structure", "Self-supervised", "Data-derived targets", "Reinforcement", "Rewards"],
    },
    vi: {
      title: "Tín hiệu học xác định họ phương pháp",
      description: "Cây phân loại dựa trên tín hiệu học sẵn có, gồm học có giám sát, không giám sát, tự giám sát và học tăng cường.",
      labels: ["Tín hiệu học", "Học có giám sát", "Nhãn của con người", "Học không giám sát", "Cấu trúc dữ liệu", "Học tự giám sát", "Mục tiêu từ dữ liệu", "Học tăng cường", "Phần thưởng"],
    },
    ko: {
      title: "학습 신호가 학습 유형을 결정합니다",
      description: "사용 가능한 학습 신호에서 지도학습, 비지도학습, 자기지도학습, 강화학습으로 갈라지는 분류도입니다.",
      labels: ["학습 신호", "지도학습", "사람이 만든 레이블", "비지도학습", "데이터 구조", "자기지도학습", "데이터에서 만든 목표", "강화학습", "보상"],
    },
  },
  "supervised-learning": {
    en: {
      title: "Labels close the learning loop",
      description: "Labeled examples pass through a model; prediction error is measured against the target and fed back to update the model.",
      labels: ["Input + target", "Model", "Prediction", "Compare with target", "Loss", "Update"],
    },
    vi: {
      title: "Nhãn khép kín vòng lặp học",
      description: "Ví dụ có nhãn đi qua mô hình; sai số dự đoán được đo theo mục tiêu rồi phản hồi để cập nhật mô hình.",
      labels: ["Đầu vào + mục tiêu", "Mô hình", "Dự đoán", "So với mục tiêu", "Hàm mất mát", "Cập nhật"],
    },
    ko: {
      title: "레이블이 학습 순환을 완성합니다",
      description: "레이블이 있는 예제가 모델을 통과하고, 예측 오차를 목표와 비교한 뒤 모델 갱신에 되먹임합니다.",
      labels: ["입력 + 목표", "모델", "예측", "목표와 비교", "손실", "갱신"],
    },
  },
  clustering: {
    en: {
      title: "Similarity becomes spatial grouping",
      description: "Unlabeled observations form three compact groups; each diamond marks a representative cluster center.",
      labels: ["Cluster A", "Cluster B", "Cluster C", "Center"],
    },
    vi: {
      title: "Độ tương đồng trở thành nhóm trong không gian",
      description: "Các quan sát không nhãn tạo thành ba nhóm cô đọng; mỗi hình thoi biểu diễn một tâm cụm đại diện.",
      labels: ["Cụm A", "Cụm B", "Cụm C", "Tâm cụm"],
    },
    ko: {
      title: "유사성이 공간의 군집이 됩니다",
      description: "레이블 없는 관측값이 세 개의 조밀한 그룹을 만들고, 마름모는 각 군집의 대표 중심을 나타냅니다.",
      labels: ["군집 A", "군집 B", "군집 C", "중심"],
    },
  },
  "artificial-neural-networks": {
    en: {
      title: "Representations transform layer by layer",
      description: "Signals move from input nodes through two hidden layers to an output; connections carry learned weights.",
      labels: ["Input", "Hidden 1", "Hidden 2", "Output"],
    },
    vi: {
      title: "Biểu diễn biến đổi qua từng lớp",
      description: "Tín hiệu đi từ các nút đầu vào qua hai lớp ẩn đến đầu ra; các liên kết mang trọng số đã học.",
      labels: ["Đầu vào", "Lớp ẩn 1", "Lớp ẩn 2", "Đầu ra"],
    },
    ko: {
      title: "표현은 층마다 변환됩니다",
      description: "신호가 입력 노드에서 두 은닉층을 거쳐 출력으로 이동하며, 연결에는 학습된 가중치가 담깁니다.",
      labels: ["입력", "은닉층 1", "은닉층 2", "출력"],
    },
  },
  "decision-trees": {
    en: {
      title: "Each question partitions the cases",
      description: "A decision tree routes a case through yes-or-no questions until it reaches one prediction leaf.",
      labels: ["Feature A ≤ threshold?", "Yes", "No", "Feature B present?", "Class 1", "Class 2", "Class 3"],
    },
    vi: {
      title: "Mỗi câu hỏi phân chia các trường hợp",
      description: "Cây quyết định dẫn một trường hợp qua các câu hỏi có hoặc không cho đến khi tới một nút lá dự đoán.",
      labels: ["Đặc trưng A ≤ ngưỡng?", "Có", "Không", "Có đặc trưng B?", "Lớp 1", "Lớp 2", "Lớp 3"],
    },
    ko: {
      title: "각 질문이 사례를 나눕니다",
      description: "의사결정나무는 사례를 예·아니요 질문으로 분기해 하나의 예측 잎 노드에 도달시킵니다.",
      labels: ["특징 A ≤ 임계값?", "예", "아니요", "특징 B가 있는가?", "클래스 1", "클래스 2", "클래스 3"],
    },
  },
  "cross-validation": {
    en: {
      title: "Validation rotates through every fold",
      description: "Five cross-validation rounds use a different held-out fold each time while the remaining folds train the model.",
      labels: ["Round", "Fold", "Train", "Validate"],
    },
    vi: {
      title: "Tập thẩm định luân phiên qua mọi phần",
      description: "Năm vòng thẩm định chéo lần lượt giữ lại một phần khác nhau, còn các phần còn lại dùng để huấn luyện mô hình.",
      labels: ["Vòng", "Phần", "Huấn luyện", "Thẩm định"],
    },
    ko: {
      title: "검증 폴드가 매번 순환합니다",
      description: "5회의 교차검증에서 서로 다른 폴드를 하나씩 보류하고 나머지 폴드로 모델을 학습합니다.",
      labels: ["회차", "폴드", "학습", "검증"],
    },
  },
  "roc-auc": {
    en: {
      title: "Every threshold trades hits for false alarms",
      description: "An ROC curve plots true-positive rate against false-positive rate; curves closer to the upper-left dominate the random baseline.",
      labels: ["False-positive rate", "True-positive rate", "Random baseline", "Better"],
    },
    vi: {
      title: "Mỗi ngưỡng đánh đổi phát hiện và báo động giả",
      description: "Đường cong ROC biểu diễn tỷ lệ dương tính thật theo tỷ lệ dương tính giả; đường gần góc trên trái tốt hơn đường cơ sở ngẫu nhiên.",
      labels: ["Tỷ lệ dương tính giả", "Tỷ lệ dương tính thật", "Đường cơ sở ngẫu nhiên", "Tốt hơn"],
    },
    ko: {
      title: "임계값마다 적중과 오경보가 교환됩니다",
      description: "ROC 곡선은 거짓 양성률에 따른 참 양성률을 나타내며, 왼쪽 위에 가까운 곡선이 무작위 기준선보다 우세합니다.",
      labels: ["거짓 양성률", "참 양성률", "무작위 기준선", "더 좋음"],
    },
  },
  "distribution-shift": {
    en: {
      title: "Production data can move away from training data",
      description: "Side-by-side histograms show the same feature concentrated in different ranges during training and production.",
      labels: ["Training", "Production", "Feature value", "Frequency", "Shift"],
    },
    vi: {
      title: "Dữ liệu vận hành có thể lệch khỏi dữ liệu huấn luyện",
      description: "Hai biểu đồ tần suất cho thấy cùng một đặc trưng tập trung ở các miền khác nhau khi huấn luyện và vận hành.",
      labels: ["Huấn luyện", "Vận hành", "Giá trị đặc trưng", "Tần suất", "Độ lệch"],
    },
    ko: {
      title: "운영 데이터는 학습 데이터에서 이동할 수 있습니다",
      description: "나란한 히스토그램은 같은 특징이 학습 시점과 운영 시점에 서로 다른 구간에 집중되는 모습을 보여줍니다.",
      labels: ["학습", "운영", "특징값", "빈도", "이동"],
    },
  },
  "reinforcement-learning": {
    en: {
      title: "Learning emerges from an action–reward loop",
      description: "An agent observes state, chooses an action, changes the environment, receives a reward, and updates its policy before acting again.",
      labels: ["Agent", "Action", "Environment", "New state", "Reward", "Update policy"],
    },
    vi: {
      title: "Việc học hình thành từ vòng lặp hành động–phần thưởng",
      description: "Tác tử quan sát trạng thái, chọn hành động, làm thay đổi môi trường, nhận phần thưởng rồi cập nhật chính sách trước lần hành động tiếp theo.",
      labels: ["Tác tử", "Hành động", "Môi trường", "Trạng thái mới", "Phần thưởng", "Cập nhật chính sách"],
    },
    ko: {
      title: "학습은 행동–보상 순환에서 생깁니다",
      description: "에이전트가 상태를 관찰하고 행동을 선택해 환경을 바꾸며, 보상을 받은 뒤 정책을 갱신하고 다시 행동합니다.",
      labels: ["에이전트", "행동", "환경", "새 상태", "보상", "정책 갱신"],
    },
  },
  "ensemble-learning": {
    en: {
      title: "Several models contribute to one decision",
      description: "The same evidence reaches several diverse models; an aggregation rule combines their outputs into one final prediction.",
      labels: ["Evidence", "Model A", "Model B", "Model C", "Aggregate", "Final prediction"],
    },
    vi: {
      title: "Nhiều mô hình cùng đóng góp vào một quyết định",
      description: "Cùng một bằng chứng được đưa vào nhiều mô hình đa dạng; quy tắc tổng hợp kết hợp các đầu ra thành một dự đoán cuối cùng.",
      labels: ["Bằng chứng", "Mô hình A", "Mô hình B", "Mô hình C", "Tổng hợp", "Dự đoán cuối"],
    },
    ko: {
      title: "여러 모델이 하나의 결정에 기여합니다",
      description: "같은 근거가 다양한 모델에 입력되고, 집계 규칙이 각 출력을 하나의 최종 예측으로 결합합니다.",
      labels: ["근거", "모델 A", "모델 B", "모델 C", "집계", "최종 예측"],
    },
  },
  "dimensionality-reduction-and-metric-learning": {
    en: {
      title: "A projection preserves useful neighborhood structure",
      description: "High-dimensional feature vectors are projected into two dimensions so nearby observations remain close and groups become inspectable.",
      labels: ["High-dimensional vectors", "Project", "Two-dimensional embedding", "Near", "Far"],
    },
    vi: {
      title: "Phép chiếu giữ lại cấu trúc lân cận hữu ích",
      description: "Vector đặc trưng nhiều chiều được chiếu xuống hai chiều để các quan sát tương tự vẫn ở gần nhau và các nhóm có thể được quan sát.",
      labels: ["Vector nhiều chiều", "Phép chiếu", "Không gian nhúng hai chiều", "Gần", "Xa"],
    },
    ko: {
      title: "투영은 유용한 이웃 구조를 보존합니다",
      description: "고차원 특징 벡터를 2차원으로 투영해 비슷한 관측값은 가깝게 유지하고 그룹을 살펴볼 수 있게 합니다.",
      labels: ["고차원 벡터", "투영", "2차원 임베딩", "가까움", "멀리"],
    },
  },
  "graph-machine-learning": {
    en: {
      title: "Nodes learn by exchanging neighborhood messages",
      description: "A focal node receives messages from connected neighbors, aggregates them, and updates its representation.",
      labels: ["Neighbor A", "Neighbor B", "Neighbor C", "Focal node", "Messages", "Updated representation"],
    },
    vi: {
      title: "Các nút học bằng cách trao đổi thông điệp lân cận",
      description: "Một nút trung tâm nhận thông điệp từ các nút lân cận có liên kết, tổng hợp chúng rồi cập nhật biểu diễn.",
      labels: ["Lân cận A", "Lân cận B", "Lân cận C", "Nút trung tâm", "Thông điệp", "Biểu diễn mới"],
    },
    ko: {
      title: "노드는 이웃 메시지를 교환하며 학습합니다",
      description: "중심 노드가 연결된 이웃에서 메시지를 받고 집계한 뒤 자신의 표현을 갱신합니다.",
      labels: ["이웃 A", "이웃 B", "이웃 C", "중심 노드", "메시지", "갱신된 표현"],
    },
  },
  "support-vector-machines": {
    en: {
      title: "The widest margin defines the separator",
      description: "Two classes lie on opposite sides of a decision boundary; the closest support vectors determine the parallel margin.",
      labels: ["Class A", "Class B", "Decision boundary", "Margin", "Support vectors"],
    },
    vi: {
      title: "Biên lớn nhất xác định đường phân tách",
      description: "Hai lớp nằm ở hai phía của ranh giới quyết định; các vector hỗ trợ gần nhất xác định hai đường biên song song.",
      labels: ["Lớp A", "Lớp B", "Ranh giới quyết định", "Biên", "Vector hỗ trợ"],
    },
    ko: {
      title: "가장 넓은 마진이 분리 경계를 정합니다",
      description: "두 클래스가 결정 경계의 반대편에 놓이고, 가장 가까운 서포트 벡터가 평행한 마진을 결정합니다.",
      labels: ["클래스 A", "클래스 B", "결정 경계", "마진", "서포트 벡터"],
    },
  },
  "training-loop": {
    en: {
      title: "Each batch produces one parameter update",
      description: "A training batch moves through the forward pass and loss, then gradients flow backward before the optimizer updates parameters and repeats.",
      labels: ["Batch", "Forward pass", "Loss", "Backpropagate", "Gradient", "Update parameters", "Next batch"],
    },
    vi: {
      title: "Mỗi batch tạo ra một lần cập nhật tham số",
      description: "Một batch huấn luyện đi qua lượt truyền xuôi và hàm mất mát; gradient truyền ngược trước khi bộ tối ưu cập nhật tham số rồi lặp lại.",
      labels: ["Batch", "Truyền xuôi", "Hàm mất mát", "Lan truyền ngược", "Gradient", "Cập nhật tham số", "Batch tiếp theo"],
    },
    ko: {
      title: "각 배치가 한 번의 매개변수 갱신을 만듭니다",
      description: "학습 배치가 순전파와 손실을 거치고, 기울기가 역전파된 뒤 옵티마이저가 매개변수를 갱신하며 반복합니다.",
      labels: ["배치", "순전파", "손실", "역전파", "기울기", "매개변수 갱신", "다음 배치"],
    },
  },
  "data-imbalance": {
    en: {
      title: "A large majority can hide minority failure",
      description: "A 90-to-10 class split shows why overall accuracy can look strong even when the smaller but important class is poorly recognized.",
      labels: ["Majority · 90%", "Minority · 10%", "Overall accuracy", "Minority recall", "Inspect each class"],
    },
    vi: {
      title: "Lớp đa số lớn có thể che giấu thất bại ở lớp thiểu số",
      description: "Tỷ lệ lớp 90–10 cho thấy độ chính xác tổng thể có thể cao dù lớp nhỏ hơn nhưng quan trọng lại được nhận diện kém.",
      labels: ["Đa số · 90%", "Thiểu số · 10%", "Độ chính xác tổng thể", "Recall lớp thiểu số", "Kiểm tra từng lớp"],
    },
    ko: {
      title: "큰 다수 클래스가 소수 클래스 실패를 가릴 수 있습니다",
      description: "90 대 10 클래스 비율은 중요하지만 작은 클래스를 잘 찾지 못해도 전체 정확도가 높아 보일 수 있음을 보여줍니다.",
      labels: ["다수 · 90%", "소수 · 10%", "전체 정확도", "소수 재현율", "클래스별 확인"],
    },
  },
  "concept-map": {
    en: {
      title: "Reliable ML connects five bodies of evidence",
      description: "A concept map links problem definition, data, models, evaluation, and operations around a reliable machine-learning system.",
      labels: ["Reliable ML", "Problem", "Data", "Model", "Evaluation", "Operations", "Feedback connects every stage"],
    },
    vi: {
      title: "ML đáng tin cậy kết nối năm nhóm bằng chứng",
      description: "Bản đồ khái niệm liên kết định nghĩa bài toán, dữ liệu, mô hình, đánh giá và vận hành quanh một hệ thống học máy đáng tin cậy.",
      labels: ["ML đáng tin cậy", "Bài toán", "Dữ liệu", "Mô hình", "Đánh giá", "Vận hành", "Phản hồi kết nối mọi giai đoạn"],
    },
    ko: {
      title: "신뢰할 수 있는 ML은 다섯 근거 영역을 연결합니다",
      description: "개념 지도가 신뢰할 수 있는 머신러닝 시스템을 중심으로 문제 정의, 데이터, 모델, 평가, 운영을 연결합니다.",
      labels: ["신뢰할 수 있는 ML", "문제", "데이터", "모델", "평가", "운영", "피드백이 모든 단계를 연결"],
    },
  },
};

const licenseCopy: Record<Language, string> = {
  en: "Original Gradient Atlas illustration · CC BY 4.0",
  vi: "Minh họa gốc của Gradient Atlas · CC BY 4.0",
  ko: "Gradient Atlas 원본 도해 · CC BY 4.0",
};

const visualModelCopy: Record<Language, string> = {
  en: "VISUAL MODEL",
  vi: "MÔ HÌNH TRỰC QUAN",
  ko: "시각 모형",
};

function LeakageDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas leakage-diagram">
      <div className="leakage-track" />
      <div className="leakage-point past"><span>01</span><strong>{labels[0]}</strong></div>
      <div className="leakage-point feature"><span>02</span><strong>{labels[1]}</strong></div>
      <div className="leakage-boundary"><i /><strong>{labels[2]}</strong></div>
      <div className="leakage-point future"><span>03</span><strong>{labels[3]}</strong><small>{labels[4]}</small></div>
    </div>
  );
}

function SplitDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas split-diagram">
      <div className="split-bar">
        <div className="split-train"><strong>{labels[0]}</strong><small>{labels[1]}</small></div>
        <div className="split-validation"><strong>{labels[2]}</strong><small>{labels[3]}</small></div>
        <div className="split-test"><strong>{labels[4]}</strong><small>{labels[5]}</small></div>
      </div>
      <div className="split-locks"><span>fit</span><span>tune</span><span>claim</span></div>
    </div>
  );
}

function MatrixDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas matrix-diagram">
      <div className="matrix-corner" />
      <div className="matrix-heading actual-positive">{labels[0]}</div>
      <div className="matrix-heading actual-negative">{labels[1]}</div>
      <div className="matrix-heading predicted-positive">{labels[2]}</div>
      <div className="matrix-heading predicted-negative">{labels[3]}</div>
      <div className="matrix-cell tp"><strong>{labels[4]}</strong><span>✓</span></div>
      <div className="matrix-cell fp"><strong>{labels[5]}</strong><span>!</span></div>
      <div className="matrix-cell fn"><strong>{labels[6]}</strong><span>!</span></div>
      <div className="matrix-cell tn"><strong>{labels[7]}</strong><span>✓</span></div>
    </div>
  );
}

function RegressionDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas regression-diagram">
      <div className="plot-y">{labels[4]}</div>
      <div className="plot-x">{labels[3]}</div>
      <div className="regression-line" />
      <div className="residual-line" />
      {[1, 2, 3, 4, 5, 6, 7, 8].map((point) => (
        <i className={`regression-point point-${point}`} key={point} />
      ))}
      <div className="plot-legend">
        <span><i className="legend-dot" />{labels[0]}</span>
        <span><i className="legend-line" />{labels[1]}</span>
        <span><i className="legend-residual" />{labels[2]}</span>
      </div>
    </div>
  );
}

function ErrorMeter({
  label,
  value,
  kind,
}: {
  label: string;
  value: number;
  kind: "train" | "validation";
}) {
  return (
    <div className={`error-meter ${kind}`}>
      <span>{label}</span>
      <i><b style={{ "--error-size": `${value}%` } as CSSProperties} /></i>
    </div>
  );
}

function BiasVarianceDiagram({ labels }: { labels: string[] }) {
  const profiles = [
    { title: labels[0], train: 72, validation: 82, note: labels[5] },
    { title: labels[1], train: 24, validation: 31, note: labels[6] },
    { title: labels[2], train: 8, validation: 69, note: labels[7] },
  ];
  return (
    <div className="diagram-canvas bias-variance-diagram">
      {profiles.map((profile) => (
        <section key={profile.title}>
          <header><strong>{profile.title}</strong><small>{profile.note}</small></header>
          <ErrorMeter label={labels[3]} value={profile.train} kind="train" />
          <ErrorMeter label={labels[4]} value={profile.validation} kind="validation" />
        </section>
      ))}
    </div>
  );
}

function WorkflowDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas workflow-diagram">
      <div className="workflow-stages">
        {labels.slice(0, 7).map((label, index) => (
          <div className={`workflow-stage stage-${index + 1}`} key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            {index < 6 && <i>→</i>}
          </div>
        ))}
      </div>
      <div className="workflow-feedback"><span>↺</span><strong>{labels[7]}</strong></div>
    </div>
  );
}

function LearningTypesDiagram({ labels }: { labels: string[] }) {
  const branches = [
    { title: labels[1], signal: labels[2] },
    { title: labels[3], signal: labels[4] },
    { title: labels[5], signal: labels[6] },
    { title: labels[7], signal: labels[8] },
  ];
  return (
    <div className="diagram-canvas learning-types-diagram">
      <div className="taxonomy-root">{labels[0]}</div>
      <div className="taxonomy-branches">
        {branches.map((branch, index) => (
          <section key={branch.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{branch.title}</strong>
            <small>{branch.signal}</small>
          </section>
        ))}
      </div>
    </div>
  );
}

function SupervisedDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas supervised-diagram">
      <div className="supervised-main-flow">
        {labels.slice(0, 4).map((label, index) => (
          <div className="supervised-node" key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            {index < 3 && <i>→</i>}
          </div>
        ))}
      </div>
      <div className="supervised-feedback">
        <strong>{labels[4]}</strong>
        <span>↺</span>
        <strong>{labels[5]}</strong>
      </div>
    </div>
  );
}

function ClusteringDiagram({ labels }: { labels: string[] }) {
  const points = [
    ["a", 13, 27], ["a", 20, 20], ["a", 24, 37], ["a", 31, 29],
    ["b", 48, 68], ["b", 55, 58], ["b", 61, 72], ["b", 66, 62],
    ["c", 71, 24], ["c", 79, 34], ["c", 84, 18], ["c", 89, 30],
  ] as const;
  const centers = [["a", 22, 28], ["b", 58, 65], ["c", 81, 27]] as const;
  return (
    <div className="diagram-canvas clustering-diagram">
      <div className="cluster-plot">
        {points.map(([cluster, left, top], index) => (
          <i
            className={`cluster-point cluster-${cluster}`}
            key={`${cluster}-${index}`}
            style={{ "--left": `${left}%`, "--top": `${top}%` } as CSSProperties}
          />
        ))}
        {centers.map(([cluster, left, top]) => (
          <b
            className={`cluster-center cluster-${cluster}`}
            key={cluster}
            style={{ "--left": `${left}%`, "--top": `${top}%` } as CSSProperties}
          />
        ))}
      </div>
      <div className="cluster-legend">
        {labels.slice(0, 3).map((label, index) => (
          <span key={label}><i className={`cluster-${String.fromCharCode(97 + index)}`} />{label}</span>
        ))}
        <span><b />{labels[3]}</span>
      </div>
    </div>
  );
}

function NeuralNetworkDiagram({ labels }: { labels: string[] }) {
  const nodeCounts = [3, 4, 4, 2];
  return (
    <div className="diagram-canvas neural-diagram">
      {labels.map((label, layer) => (
        <section className={`neural-layer layer-${layer + 1}`} key={label}>
          <strong>{label}</strong>
          <div>
            {Array.from({ length: nodeCounts[layer] }, (_, node) => (
              <i key={node}><span>{layer + 1}.{node + 1}</span></i>
            ))}
          </div>
          {layer < labels.length - 1 && <b aria-hidden="true">→</b>}
        </section>
      ))}
    </div>
  );
}

function DecisionTreeDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas tree-diagram">
      <div className="tree-root">{labels[0]}</div>
      <div className="tree-branch branch-left"><span>{labels[1]}</span></div>
      <div className="tree-branch branch-right"><span>{labels[2]}</span></div>
      <div className="tree-question">{labels[3]}</div>
      <div className="tree-leaf leaf-one">{labels[4]}</div>
      <div className="tree-leaf leaf-two">{labels[5]}</div>
      <div className="tree-leaf leaf-three">{labels[6]}</div>
    </div>
  );
}

function CrossValidationDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas cross-validation-diagram">
      <div className="fold-heading"><span>{labels[0]}</span>{[1, 2, 3, 4, 5].map((fold) => <b key={fold}>{labels[1]} {fold}</b>)}</div>
      {[0, 1, 2, 3, 4].map((round) => (
        <div className="fold-row" key={round}>
          <strong>{round + 1}</strong>
          {[0, 1, 2, 3, 4].map((fold) => (
            <span className={fold === round ? "validate" : "train"} key={fold}>
              {fold === round ? labels[3] : labels[2]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function RocDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas roc-diagram">
      <div className="roc-y">{labels[1]}</div>
      <div className="roc-x">{labels[0]}</div>
      <div className="roc-random"><span>{labels[2]}</span></div>
      <div className="roc-curve">
        <i className="roc-segment segment-1" />
        <i className="roc-segment segment-2" />
        <i className="roc-segment segment-3" />
        <i className="roc-segment segment-4" />
        <i className="roc-segment segment-5" />
      </div>
      <strong className="roc-better">↖ {labels[3]}</strong>
    </div>
  );
}

function DistributionShiftDiagram({ labels }: { labels: string[] }) {
  const histograms = [
    { title: labels[0], values: [18, 42, 76, 92, 63, 31, 12], kind: "train" },
    { title: labels[1], values: [8, 15, 29, 48, 72, 94, 68], kind: "production" },
  ];
  return (
    <div className="diagram-canvas shift-diagram">
      <div className="shift-panels">
        {histograms.map((histogram) => (
          <section key={histogram.title}>
            <strong>{histogram.title}</strong>
            <div className={`histogram ${histogram.kind}`}>
              {histogram.values.map((value, index) => (
                <i key={index} style={{ "--bar-height": `${value}%` } as CSSProperties} />
              ))}
            </div>
            <small>{labels[2]} →</small>
          </section>
        ))}
      </div>
      <div className="shift-axis">{labels[3]}</div>
      <div className="shift-marker"><span>→</span><strong>{labels[4]}</strong></div>
    </div>
  );
}

function ReinforcementDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas reinforcement-diagram">
      <div className="rl-node agent"><span>01</span><strong>{labels[0]}</strong></div>
      <div className="rl-exchange action"><strong>{labels[1]}</strong><span>→</span></div>
      <div className="rl-node environment"><span>02</span><strong>{labels[2]}</strong></div>
      <div className="rl-exchange state"><span>←</span><strong>{labels[3]}</strong><small>{labels[4]}</small></div>
      <div className="rl-update"><span>↺</span><strong>{labels[5]}</strong></div>
    </div>
  );
}

function EnsembleDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas ensemble-diagram">
      <div className="ensemble-source"><span>01</span><strong>{labels[0]}</strong></div>
      <div className="ensemble-arrow">→</div>
      <div className="ensemble-models">
        {labels.slice(1, 4).map((label, index) => (
          <div key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></div>
        ))}
      </div>
      <div className="ensemble-arrow">→</div>
      <div className="ensemble-aggregate"><span>Σ</span><strong>{labels[4]}</strong></div>
      <div className="ensemble-arrow">→</div>
      <div className="ensemble-result"><span>✓</span><strong>{labels[5]}</strong></div>
    </div>
  );
}

function ProjectionDiagram({ labels }: { labels: string[] }) {
  const embeddingPoints = [
    ["a", 18, 30], ["a", 27, 38], ["a", 32, 24], ["a", 38, 34],
    ["b", 62, 68], ["b", 69, 56], ["b", 76, 66], ["b", 82, 52],
  ] as const;
  return (
    <div className="diagram-canvas projection-diagram">
      <section className="vector-space">
        <strong>{labels[0]}</strong>
        {[
          ["x₁", ".82", ".14", ".55", ".30"],
          ["x₂", ".18", ".91", ".42", ".67"],
          ["x₃", ".73", ".28", ".64", ".09"],
        ].map((vector) => (
          <div key={vector[0]}><b>{vector[0]}</b>{vector.slice(1).map((value, index) => <span key={index}>{value}</span>)}</div>
        ))}
      </section>
      <div className="projection-action"><span>→</span><strong>{labels[1]}</strong></div>
      <section className="embedding-space">
        <strong>{labels[2]}</strong>
        <div>
          {embeddingPoints.map(([group, left, top], index) => (
            <i
              className={`embedding-point group-${group}`}
              key={`${group}-${index}`}
              style={{ "--left": `${left}%`, "--top": `${top}%` } as CSSProperties}
            />
          ))}
          <small className="embedding-near">{labels[3]}</small>
          <small className="embedding-far">{labels[4]}</small>
        </div>
      </section>
    </div>
  );
}

function GraphLearningDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas graph-learning-diagram">
      <i className="graph-edge edge-a" /><i className="graph-edge edge-b" /><i className="graph-edge edge-c" />
      {labels.slice(0, 3).map((label, index) => (
        <div className={`graph-node neighbor neighbor-${index + 1}`} key={label}>
          <span>{index + 1}</span><strong>{label}</strong>
        </div>
      ))}
      <div className="graph-node focal"><span>Σ</span><strong>{labels[3]}</strong></div>
      <div className="graph-message">{labels[4]} <span>→</span></div>
      <div className="graph-output"><span>✓</span><strong>{labels[5]}</strong></div>
    </div>
  );
}

function SvmDiagram({ labels }: { labels: string[] }) {
  const points = [
    ["a", 13, 72], ["a", 22, 62], ["a", 27, 78], ["a support", 39, 61],
    ["b support", 57, 42], ["b", 67, 26], ["b", 76, 38], ["b", 86, 22],
  ] as const;
  return (
    <div className="diagram-canvas svm-diagram">
      <div className="svm-margin margin-one" />
      <div className="svm-boundary" />
      <div className="svm-margin margin-two" />
      {points.map(([kind, left, top], index) => (
        <i
          className={`svm-point class-${kind.charAt(0)}${kind.includes("support") ? " support" : ""}`}
          key={index}
          style={{ "--left": `${left}%`, "--top": `${top}%` } as CSSProperties}
        />
      ))}
      <div className="svm-legend">
        <span><i className="class-a" />{labels[0]}</span>
        <span><i className="class-b" />{labels[1]}</span>
        <span><i className="boundary-key" />{labels[2]}</span>
        <span><i className="margin-key" />{labels[3]}</span>
        <span><i className="support-key" />{labels[4]}</span>
      </div>
    </div>
  );
}

function TrainingLoopDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas training-loop-diagram">
      <div className="training-stages">
        {labels.slice(0, 6).map((label, index) => (
          <div key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            {index < 5 && <i>→</i>}
          </div>
        ))}
      </div>
      <div className="training-repeat"><span>↺</span><strong>{labels[6]}</strong></div>
    </div>
  );
}

function ImbalanceDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas imbalance-diagram">
      <div className="imbalance-prevalence">
        <div className="majority"><strong>{labels[0]}</strong></div>
        <div className="minority"><strong>{labels[1]}</strong></div>
      </div>
      <div className="imbalance-metrics">
        <section>
          <span>92%</span>
          <strong>{labels[2]}</strong>
          <small>✓</small>
        </section>
        <div>≠</div>
        <section className="warning">
          <span>41%</span>
          <strong>{labels[3]}</strong>
          <small>!</small>
        </section>
      </div>
      <div className="imbalance-note">→ {labels[4]}</div>
    </div>
  );
}

function ConceptMapDiagram({ labels }: { labels: string[] }) {
  return (
    <div className="diagram-canvas concept-map-diagram">
      <div className="concept-hub"><span>ML</span><strong>{labels[0]}</strong></div>
      {labels.slice(1, 6).map((label, index) => (
        <div className={`concept-spoke spoke-${index + 1}`} key={label}>
          <span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong>
        </div>
      ))}
      <div className="concept-feedback"><span>↺</span><strong>{labels[6]}</strong></div>
    </div>
  );
}

function diagramGraphic(slug: DiagramSlug, labels: string[]): ReactNode {
  switch (slug) {
    case "data-leakage":
      return <LeakageDiagram labels={labels} />;
    case "train-validation-and-test":
      return <SplitDiagram labels={labels} />;
    case "confusion-matrix":
      return <MatrixDiagram labels={labels} />;
    case "linear-regression":
      return <RegressionDiagram labels={labels} />;
    case "bias-variance-and-overfitting":
      return <BiasVarianceDiagram labels={labels} />;
    case "end-to-end-ml-workflow":
      return <WorkflowDiagram labels={labels} />;
    case "types-of-learning":
      return <LearningTypesDiagram labels={labels} />;
    case "supervised-learning":
      return <SupervisedDiagram labels={labels} />;
    case "clustering":
      return <ClusteringDiagram labels={labels} />;
    case "artificial-neural-networks":
      return <NeuralNetworkDiagram labels={labels} />;
    case "decision-trees":
      return <DecisionTreeDiagram labels={labels} />;
    case "cross-validation":
      return <CrossValidationDiagram labels={labels} />;
    case "roc-auc":
      return <RocDiagram labels={labels} />;
    case "distribution-shift":
      return <DistributionShiftDiagram labels={labels} />;
    case "reinforcement-learning":
      return <ReinforcementDiagram labels={labels} />;
    case "ensemble-learning":
      return <EnsembleDiagram labels={labels} />;
    case "dimensionality-reduction-and-metric-learning":
      return <ProjectionDiagram labels={labels} />;
    case "graph-machine-learning":
      return <GraphLearningDiagram labels={labels} />;
    case "support-vector-machines":
      return <SvmDiagram labels={labels} />;
    case "training-loop":
      return <TrainingLoopDiagram labels={labels} />;
    case "data-imbalance":
      return <ImbalanceDiagram labels={labels} />;
    case "concept-map":
      return <ConceptMapDiagram labels={labels} />;
  }
}

export function LessonDiagram({
  language,
  slug,
}: {
  language: Language;
  slug: string;
}) {
  if (!diagramSlugs.includes(slug as DiagramSlug)) return null;
  const diagramSlug = slug as DiagramSlug;
  const content = copy[diagramSlug][language];

  return (
    <figure className="concept-diagram" data-diagram={diagramSlug}>
      <header>
        <span>{visualModelCopy[language]}</span>
        <h2>{content.title}</h2>
      </header>
      <div role="img" aria-label={content.description}>
        {diagramGraphic(diagramSlug, content.labels)}
      </div>
      <figcaption>
        <p>{content.description}</p>
        <small>{licenseCopy[language]}</small>
      </figcaption>
    </figure>
  );
}

export const lessonDiagramSlugs = [...diagramSlugs];

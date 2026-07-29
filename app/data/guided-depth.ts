import type {
  CourseLanguage,
  GuidedSlug,
  ReferenceId,
} from "./guided-course";

export type GuidedDepth = {
  estimatedMinutes: string;
  purpose: string;
  thinkingFlow: Array<{
    label: string;
    detail: string;
  }>;
  practice: {
    title: string;
    setup: string;
    interpretation: string;
    challenge: string;
  };
  quiz: Array<{
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  }>;
  trend: {
    title: string;
    body: string;
    watch: string[];
    references: ReferenceId[];
  };
};

export const practiceCodeBySlug: Record<GuidedSlug, string> = {
  "what-machine-learning-learns": `actual =    [0, 0, 1, 0, 1, 0, 0, 1]
baseline =  [0, 0, 0, 0, 0, 0, 0, 0]
candidate = [0, 0, 1, 1, 1, 0, 1, 0]

def decision_cost(predictions):
    false_alarms = sum(p == 1 and y == 0 for p, y in zip(predictions, actual))
    missed_late = sum(p == 0 and y == 1 for p, y in zip(predictions, actual))
    return false_alarms, missed_late, false_alarms * 2 + missed_late * 8

for name, predictions in [("baseline", baseline), ("candidate", candidate)]:
    fp, fn, cost = decision_cost(predictions)
    print(f"{name}: FP={fp}, FN={fn}, cost={cost}")`,
  "data-features-and-labels": `decision_minute = 30
fields = [
    ("distance_km", 0),
    ("carrier_load", 20),
    ("delivered_at", 900),
]

usable = [
    name
    for name, available_minute in fields
    if available_minute <= decision_minute
]

print("usable features:", usable)`,
  "train-validation-and-test": `months = list(range(1, 13))

train = months[:8]
validation = months[8:10]
test = months[10:]

print("train:", train)
print("validation:", validation)
print("test:", test)`,
  "metrics-and-thresholds": `scores = [0.90, 0.80, 0.62, 0.55, 0.40, 0.20]
actual = [1, 0, 1, 0, 1, 0]
capacity = 4

def evaluate(threshold):
    predicted = [score >= threshold for score in scores]
    flags = sum(predicted)
    false_alarms = sum(p and not y for p, y in zip(predicted, actual))
    missed_late = sum(not p and y for p, y in zip(predicted, actual))
    cost = false_alarms * 2 + missed_late * 5
    return threshold, flags, cost

choices = [evaluate(t) for t in (0.30, 0.50, 0.70)]
feasible = [choice for choice in choices if choice[1] <= capacity]
best = min(feasible, key=lambda choice: choice[2])
print(f"threshold={best[0]:.1f}, flags={best[1]}, cost={best[2]}")`,
  "bias-variance-and-overfitting": `complexity = [1, 2, 3, 4, 5]
train_score = [0.70, 0.78, 0.86, 0.94, 0.99]
validation_score = [0.68, 0.76, 0.82, 0.80, 0.74]

best_index = max(
    range(len(complexity)),
    key=lambda index: validation_score[index],
)

best_complexity = complexity[best_index]
gap = train_score[best_index] - validation_score[best_index]
print(f"choose complexity={best_complexity}")
print(f"train-validation gap={gap:.2f}")`,
  "end-to-end-ml-workflow": `reference = {"missing_distance": 0.02, "mean_distance": 42.0}
production_distance = [38, None, 45, 120, None]

observed = [value for value in production_distance if value is not None]
missing_rate = 1 - len(observed) / len(production_distance)
mean_distance = sum(observed) / len(observed)

unsafe = (
    missing_rate > 0.10
    or abs(mean_distance - reference["mean_distance"]) > 15
)

print(f"missing={missing_rate:.0%}, mean={mean_distance:.1f}km")
print("action=HOLD MODEL; USE RULE-BASED FALLBACK" if unsafe else "action=SERVE")`,
};

export const practiceOutputBySlug: Record<GuidedSlug, string> = {
  "what-machine-learning-learns":
    "baseline: FP=0, FN=3, cost=24\ncandidate: FP=2, FN=1, cost=12",
  "data-features-and-labels":
    "usable features: ['distance_km', 'carrier_load']",
  "train-validation-and-test":
    "train: [1, 2, 3, 4, 5, 6, 7, 8]\nvalidation: [9, 10]\ntest: [11, 12]",
  "metrics-and-thresholds":
    "threshold=0.5, flags=4, cost=9",
  "bias-variance-and-overfitting":
    "choose complexity=3\ntrain-validation gap=0.04",
  "end-to-end-ml-workflow":
    "missing=40%, mean=67.7km\naction=HOLD MODEL; USE RULE-BASED FALLBACK",
};

const guidedDepth: Record<
  CourseLanguage,
  Record<GuidedSlug, GuidedDepth>
> = {
  en: {
    "what-machine-learning-learns": {
      estimatedMinutes: "18",
      purpose:
        "This chapter prevents model-first thinking. You will connect a real outcome to an action, define what must be predicted, and decide what evidence would justify using the system.",
      thinkingFlow: [
        { label: "Outcome", detail: "What should improve in the real world?" },
        { label: "Action", detail: "What can a person or system actually do?" },
        { label: "Prediction", detail: "What unknown quantity would support that action?" },
        { label: "Evidence", detail: "What comparison would justify deployment?" },
      ],
      practice: {
        title: "Compare a baseline with a candidate decision rule",
        setup:
          "Run this dependency-free Python example. A missed late order costs four times as much as a false alarm, so accuracy alone is not the decision criterion.",
        interpretation:
          "The candidate makes more false alarms but halves the weighted operational cost. That is evidence of value only if the cost assumptions and sample represent reality.",
        challenge:
          "Change the missed-order cost from 8 to 3. Does the preferred rule change, and what business assumption did you just test?",
      },
      quiz: [
        {
          question: "Which statement should be written first?",
          options: [
            "Use gradient boosting",
            "Reduce preventable late deliveries",
            "Reach 95% accuracy",
            "Collect every available field",
          ],
          answer: 1,
          explanation:
            "The non-ML outcome comes first. Models, metrics, and fields are choices made in service of that outcome.",
        },
        {
          question: "When is a simple baseline most useful?",
          options: [
            "Only after the complex model fails",
            "As a control that shows whether complexity adds value",
            "Only for balanced datasets",
            "When no evaluation data exists",
          ],
          answer: 1,
          explanation:
            "A baseline turns the experiment into a comparison and often exposes leakage, imbalance, or a weak success definition.",
        },
      ],
      trend: {
        title: "Decision-first ML now includes more possible solution types",
        body:
          "Current teams compare a heuristic, predictive ML, generative AI, and automated modeling before committing to a system. The durable skill is not naming a fashionable model; it is connecting the chosen approach to an outcome, constraints, action, and separate success metric.",
        watch: [
          "Keep product-success metrics separate from offline model metrics.",
          "Treat proxy labels as assumptions that can change behavior.",
          "Recheck whether a simpler rule remains competitive.",
        ],
        references: ["google-problem-framing", "google-ml-crash-course"],
      },
    },
    "data-features-and-labels": {
      estimatedMinutes: "20",
      purpose:
        "This chapter turns a table back into the process that produced it. You will identify measurement choices, enforce the decision-time boundary, and document how labels become operational proxies.",
      thinkingFlow: [
        { label: "Event", detail: "What happened in the real process?" },
        { label: "Measurement", detail: "How and for whom was it recorded?" },
        { label: "Availability", detail: "Was the value known at decision time?" },
        { label: "Dataset", detail: "Which versioned row and label reach training?" },
      ],
      practice: {
        title: "Enforce the decision-time boundary",
        setup:
          "The example records when each field becomes available. The feature selector keeps only values known before the warning must be issued.",
        interpretation:
          "Although delivered_at is highly predictive of lateness, it appears after the decision and is correctly excluded. Predictiveness cannot make an impossible feature valid.",
        challenge:
          "Add a weather forecast available at minute 25 and an actual rainfall total available at minute 600. Which one belongs in the model?",
      },
      quiz: [
        {
          question: "Which field is most likely to cause target leakage?",
          options: [
            "Distance known at checkout",
            "Carrier capacity known before dispatch",
            "Final delivery timestamp",
            "Destination region",
          ],
          answer: 2,
          explanation:
            "The final delivery timestamp is created after the warning decision and directly reveals the outcome.",
        },
        {
          question: "Why is a label an operational proxy?",
          options: [
            "Labels are always numeric",
            "A recording rule approximates the real concept of interest",
            "Models cannot learn from true outcomes",
            "All labels are generated by people",
          ],
          answer: 1,
          explanation:
            "The label depends on a definition, measurement process, timing, and missingness; it is not the real-world concept itself.",
        },
      ],
      trend: {
        title: "Data contracts and production parity are becoming core model work",
        body:
          "Modern ML practice treats schemas, lineage, label policy, feature availability, and training-serving consistency as product interfaces. Data quality is also inspected by meaningful slices because a clean aggregate can conceal missing or underrepresented groups.",
        watch: [
          "Version the label rule and feature computation with the dataset.",
          "Test the same schema and transformations in training and serving.",
          "Monitor missingness and representation by operating slice.",
        ],
        references: ["google-production-monitoring", "nist-ai-rmf"],
      },
    },
    "train-validation-and-test": {
      estimatedMinutes: "22",
      purpose:
        "This chapter protects the claim you want to make. You will translate deployment conditions into split constraints, keep model selection separate from final testing, and state exactly which future the result represents.",
      thinkingFlow: [
        { label: "Deployment", detail: "Who, where, and when will be predicted?" },
        { label: "Constraints", detail: "Which time, group, or duplicate boundaries matter?" },
        { label: "Selection", detail: "What may validation influence?" },
        { label: "Claim", detail: "What untouched test result can be reported?" },
      ],
      practice: {
        title: "Make a chronological split",
        setup:
          "This small example uses the first eight months for fitting, the next two for choices, and the final two for one forward-looking test.",
        interpretation:
          "The ordering prevents future months from teaching the model about earlier months. Real projects should also add entity grouping, deduplication, and a time gap when outcomes overlap.",
        challenge:
          "Move month 10 into training. Explain why the resulting validation claim changes even though the number of rows barely changes.",
      },
      quiz: [
        {
          question: "What happens when the test result repeatedly guides model changes?",
          options: [
            "The test set becomes larger",
            "The test set effectively becomes validation data",
            "Training becomes unbiased",
            "Cross-validation is no longer needed",
          ],
          answer: 1,
          explanation:
            "The team adapts to test feedback, so the final result is no longer an independent estimate.",
        },
        {
          question: "Which split best supports predicting future deliveries?",
          options: [
            "Random rows from every month",
            "Later months held out after earlier months",
            "The smallest orders held out",
            "Rows sorted by model score",
          ],
          answer: 1,
          explanation:
            "A time-ordered holdout matches the direction of the intended claim and avoids learning from the future.",
        },
      ],
      trend: {
        title: "Evaluation is moving from one score toward explicit measurement design",
        body:
          "Current practice emphasizes the population, time window, grouping, uncertainty, and decision target behind a score. Benchmark numbers are less useful when their assumptions do not match deployment; robust evaluation makes those assumptions visible.",
        watch: [
          "Use time-aware or group-aware resampling when rows are not exchangeable.",
          "Report variation across folds or time windows, not only a mean.",
          "Write the exact population and period supported by the test.",
        ],
        references: ["sklearn-time-series-split", "nist-evaluation-2026"],
      },
    },
    "metrics-and-thresholds": {
      estimatedMinutes: "22",
      purpose:
        "This chapter turns a predictive score into an operating decision. You will account for errors, capacity, probability quality, and slices before choosing a threshold.",
      thinkingFlow: [
        { label: "Score", detail: "How strongly does the model rank each case?" },
        { label: "Threshold", detail: "Where does a score become a flag?" },
        { label: "Constraints", detail: "What costs and review capacity apply?" },
        { label: "Action", detail: "Which operating point will be monitored?" },
      ],
      practice: {
        title: "Choose a threshold under limited capacity",
        setup:
          "The code evaluates three thresholds using a weighted error cost, then rejects thresholds that flag more orders than the team can review.",
        interpretation:
          "The selected 0.5 threshold is not a universal truth. It wins only for these scores, labels, costs, and capacity; all four can change in production.",
        challenge:
          "Increase capacity from 4 to 5. Which threshold is selected, and why does an operational resource change a model decision?",
      },
      quiz: [
        {
          question: "Why is 0.5 not automatically the correct threshold?",
          options: [
            "Probabilities cannot exceed 0.5",
            "The operating point depends on costs, capacity, prevalence, and calibration",
            "Every classifier outputs labels only",
            "Thresholds affect training features",
          ],
          answer: 1,
          explanation:
            "A threshold is a decision policy layered on a score and must match the operating context.",
        },
        {
          question: "What does good probability calibration mean near 0.8?",
          options: [
            "Every prediction is correct",
            "About 80% of comparable cases are positive",
            "Recall is exactly 0.8",
            "The threshold must be 0.8",
          ],
          answer: 1,
          explanation:
            "Calibration connects predicted probability levels with observed frequencies; it does not choose the action threshold.",
        },
      ],
      trend: {
        title: "Threshold tuning and calibration are treated as first-class model stages",
        body:
          "Current tools increasingly separate score estimation from the action rule. Teams tune thresholds with cross-validation, inspect probability calibration, and evaluate costs and slices instead of accepting a library's default cut-off.",
        watch: [
          "Fit or tune the threshold without touching the final test set.",
          "Check calibration before interpreting scores as probabilities.",
          "Revisit the threshold when prevalence, costs, or capacity changes.",
        ],
        references: ["sklearn-threshold-tuning", "sklearn-calibration"],
      },
    },
    "bias-variance-and-overfitting": {
      estimatedMinutes: "20",
      purpose:
        "This chapter changes 'the score is bad' into a diagnosis. You will compare training and validation evidence, distinguish underfitting from overfitting or shift, and choose one controlled experiment.",
      thinkingFlow: [
        { label: "Evidence", detail: "How do train and validation scores move?" },
        { label: "Gap", detail: "Are both weak, both healthy, or far apart?" },
        { label: "Diagnosis", detail: "Bias, variance, noise, or distribution shift?" },
        { label: "Experiment", detail: "What one change would test the diagnosis?" },
      ],
      practice: {
        title: "Select complexity from validation evidence",
        setup:
          "The example compares training and validation scores over increasing complexity and selects the strongest validation result rather than the strongest training result.",
        interpretation:
          "Training keeps improving after complexity 3, while validation falls. That pattern supports an overfitting diagnosis, not a request for still more complexity.",
        challenge:
          "Raise the validation score at complexity 4 to 0.85. How do the selection and train-validation gap change?",
      },
      quiz: [
        {
          question: "Which pattern most strongly suggests high variance?",
          options: [
            "Weak training and weak validation performance",
            "Strong training and much weaker validation performance",
            "Identical training and validation performance",
            "A small model file",
          ],
          answer: 1,
          explanation:
            "A persistent train-validation gap suggests the fitted rule depends too strongly on the training sample.",
        },
        {
          question: "What is the best next step after diagnosing overfitting?",
          options: [
            "Change many settings together",
            "Run one controlled experiment tied to the diagnosis",
            "Report the training score",
            "Inspect the test set after every change",
          ],
          answer: 1,
          explanation:
            "One controlled change—such as stronger regularization or more relevant data—makes the diagnosis falsifiable.",
        },
      ],
      trend: {
        title: "Capability is rising, but reliability and efficiency increasingly decide usefulness",
        body:
          "Larger and pretrained models expand what can be attempted, yet current comparison increasingly includes cost, stability, latency, and domain performance. Learning curves and controlled baselines remain useful because scaling a model or dataset is not automatically the best next experiment.",
        watch: [
          "Measure fit and inference cost alongside statistical performance.",
          "Compare adaptation of a pretrained model with a simpler task-specific baseline.",
          "Stop scaling when validation evidence plateaus or operating cost dominates.",
        ],
        references: ["sklearn-learning-curves", "stanford-ai-index-2026"],
      },
    },
    "end-to-end-ml-workflow": {
      estimatedMinutes: "24",
      purpose:
        "This chapter connects the model to a living system. You will define contracts, versions, fallback behavior, delayed outcome collection, and an owner for every monitoring signal.",
      thinkingFlow: [
        { label: "Contract", detail: "Which inputs, outputs, owners, and limits are promised?" },
        { label: "Decision", detail: "Which model version and threshold are active?" },
        { label: "Fallback", detail: "What happens when evidence or service is unsafe?" },
        { label: "Learning loop", detail: "How do monitoring and delayed outcomes trigger change?" },
      ],
      practice: {
        title: "Gate serving with a small data monitor",
        setup:
          "The example compares a production batch with reference expectations. A high missing rate or large mean shift holds the model and activates a rule-based fallback.",
        interpretation:
          "The monitor does not prove that predictive quality fell because labels have not arrived. It provides an investigation signal and a safe operating response.",
        challenge:
          "Replace the missing values with 40 and 43. Does the model serve? Which additional checks would still be required?",
      },
      quiz: [
        {
          question: "What does deployment begin?",
          options: [
            "A period when evaluation is unnecessary",
            "An operating loop of monitoring, outcomes, diagnosis, and controlled updates",
            "Automatic retraining after every prediction",
            "Removal of the fallback",
          ],
          answer: 1,
          explanation:
            "Production creates new evidence and failure modes; deployment starts the learning and control loop.",
        },
        {
          question: "What should a drift alert do before labels arrive?",
          options: [
            "Prove the model is inaccurate",
            "Trigger investigation and a predefined safe response",
            "Retrain immediately on every new row",
            "Delete the previous model",
          ],
          answer: 1,
          explanation:
            "Input drift is an investigation signal, not direct proof of outcome degradation. The response should follow a reviewed runbook.",
        },
      ],
      trend: {
        title: "Post-deployment monitoring is essential—and still maturing",
        body:
          "Current guidance treats deployed AI as a socio-technical system whose inputs, features, service behavior, slices, real-world outcomes, and unexpected effects need monitoring. Recent NIST work also notes that terminology and validated best practices remain scattered, so teams need explicit runbooks and human ownership.",
        watch: [
          "Monitor schema, missingness, feature skew, latency, and business outcomes separately.",
          "Keep a reversible fallback and version model, data, threshold, and code.",
          "Treat alerts as hypotheses with owners, evidence, and escalation rules.",
        ],
        references: ["google-production-monitoring", "nist-monitoring-2026", "nist-ai-rmf"],
      },
    },
  },
  vi: {
    "what-machine-learning-learns": {
      estimatedMinutes: "18",
      purpose:
        "Chương này ngăn tư duy chọn mô hình trước. Bạn sẽ nối outcome thực tế với hành động, xác định điều cần dự đoán và quyết định bằng chứng nào đủ để cân nhắc sử dụng hệ thống.",
      thinkingFlow: [
        { label: "Outcome", detail: "Điều gì ngoài đời cần được cải thiện?" },
        { label: "Hành động", detail: "Con người hoặc hệ thống thực sự làm được gì?" },
        { label: "Dự đoán", detail: "Đại lượng chưa biết nào hỗ trợ hành động đó?" },
        { label: "Bằng chứng", detail: "So sánh nào có thể biện minh cho triển khai?" },
      ],
      practice: {
        title: "So sánh baseline với một quy tắc quyết định ứng viên",
        setup:
          "Chạy ví dụ Python không cần thư viện này. Bỏ sót đơn trễ có chi phí gấp bốn lần cảnh báo sai, vì vậy accuracy không phải tiêu chí quyết định duy nhất.",
        interpretation:
          "Ứng viên tạo nhiều cảnh báo sai hơn nhưng giảm một nửa chi phí vận hành có trọng số. Điều đó chỉ là bằng chứng hữu ích nếu giả định chi phí và mẫu dữ liệu phản ánh thực tế.",
        challenge:
          "Đổi chi phí bỏ sót từ 8 xuống 3. Quy tắc được ưu tiên có thay đổi không, và bạn vừa kiểm tra giả định kinh doanh nào?",
      },
      quiz: [
        {
          question: "Phát biểu nào nên được viết trước?",
          options: [
            "Dùng gradient boosting",
            "Giảm số đơn giao trễ có thể phòng tránh",
            "Đạt accuracy 95%",
            "Thu thập mọi trường dữ liệu",
          ],
          answer: 1,
          explanation:
            "Outcome không phải ML phải đứng trước. Mô hình, metric và feature đều là lựa chọn phục vụ outcome đó.",
        },
        {
          question: "Khi nào baseline đơn giản hữu ích nhất?",
          options: [
            "Chỉ sau khi mô hình phức tạp thất bại",
            "Làm đối chứng để biết độ phức tạp có thêm giá trị không",
            "Chỉ với dữ liệu cân bằng",
            "Khi không có dữ liệu đánh giá",
          ],
          answer: 1,
          explanation:
            "Baseline biến thí nghiệm thành phép so sánh và thường làm lộ leakage, imbalance hoặc định nghĩa thành công yếu.",
        },
      ],
      trend: {
        title: "ML theo quyết định hiện phải so sánh nhiều loại giải pháp hơn",
        body:
          "Nhóm hiện đại so sánh heuristic, predictive ML, generative AI và automated modeling trước khi cam kết xây hệ thống. Kỹ năng bền vững không phải gọi tên mô hình thời thượng mà là nối phương pháp với outcome, ràng buộc, hành động và success metric riêng.",
        watch: [
          "Tách product-success metric khỏi model metric offline.",
          "Xem proxy label là giả định có thể làm thay đổi hành vi.",
          "Kiểm tra lại liệu quy tắc đơn giản còn cạnh tranh không.",
        ],
        references: ["google-problem-framing", "google-ml-crash-course"],
      },
    },
    "data-features-and-labels": {
      estimatedMinutes: "20",
      purpose:
        "Chương này đưa bảng dữ liệu trở lại quy trình đã tạo ra nó. Bạn sẽ xác định lựa chọn đo lường, thực thi ranh giới decision time và ghi lại cách label trở thành proxy vận hành.",
      thinkingFlow: [
        { label: "Sự kiện", detail: "Điều gì đã xảy ra trong quy trình thực?" },
        { label: "Đo lường", detail: "Nó được ghi như thế nào và cho ai?" },
        { label: "Khả dụng", detail: "Giá trị đã tồn tại ở decision time chưa?" },
        { label: "Dataset", detail: "Phiên bản row và label nào đi vào training?" },
      ],
      practice: {
        title: "Thực thi ranh giới decision time",
        setup:
          "Ví dụ ghi thời điểm từng field xuất hiện. Bộ chọn feature chỉ giữ giá trị đã biết trước lúc phải phát cảnh báo.",
        interpretation:
          "Dù delivered_at dự đoán độ trễ rất tốt, nó xuất hiện sau quyết định nên bị loại đúng cách. Tính dự đoán không biến feature bất khả dụng thành hợp lệ.",
        challenge:
          "Thêm weather forecast có ở phút 25 và lượng mưa thực tế có ở phút 600. Feature nào thuộc về mô hình?",
      },
      quiz: [
        {
          question: "Field nào dễ gây target leakage nhất?",
          options: [
            "Khoảng cách biết lúc checkout",
            "Năng lực carrier biết trước dispatch",
            "Timestamp giao hàng cuối cùng",
            "Vùng đích",
          ],
          answer: 2,
          explanation:
            "Timestamp cuối được tạo sau quyết định cảnh báo và trực tiếp tiết lộ outcome.",
        },
        {
          question: "Vì sao label là operational proxy?",
          options: [
            "Label luôn là số",
            "Quy tắc ghi nhận chỉ xấp xỉ khái niệm thực cần quan tâm",
            "Mô hình không học được outcome thật",
            "Mọi label đều do con người tạo",
          ],
          answer: 1,
          explanation:
            "Label phụ thuộc định nghĩa, quy trình đo, thời điểm và missingness; nó không phải chính khái niệm ngoài đời.",
        },
      ],
      trend: {
        title: "Data contract và production parity đang trở thành công việc cốt lõi",
        body:
          "Thực hành ML hiện đại xem schema, lineage, label policy, feature availability và tính nhất quán train-serving như interface của sản phẩm. Chất lượng dữ liệu cũng được kiểm tra theo slice có ý nghĩa vì aggregate sạch có thể che nhóm thiếu hoặc ít đại diện.",
        watch: [
          "Version quy tắc label và phép biến đổi feature cùng dataset.",
          "Test cùng schema và transformation ở training lẫn serving.",
          "Giám sát missingness và representation theo operating slice.",
        ],
        references: ["google-production-monitoring", "nist-ai-rmf"],
      },
    },
    "train-validation-and-test": {
      estimatedMinutes: "22",
      purpose:
        "Chương này bảo vệ tuyên bố bạn muốn đưa ra. Bạn sẽ chuyển điều kiện deployment thành ràng buộc split, tách model selection khỏi final test và nói rõ kết quả đại diện cho tương lai nào.",
      thinkingFlow: [
        { label: "Deployment", detail: "Dự đoán cho ai, ở đâu và khi nào?" },
        { label: "Ràng buộc", detail: "Ranh giới time, group hoặc duplicate nào quan trọng?" },
        { label: "Lựa chọn", detail: "Validation được phép ảnh hưởng điều gì?" },
        { label: "Tuyên bố", detail: "Kết quả test chưa đụng tới nào được báo cáo?" },
      ],
      practice: {
        title: "Tạo chronological split",
        setup:
          "Ví dụ nhỏ dùng tám tháng đầu để fit, hai tháng tiếp để lựa chọn và hai tháng cuối cho một forward-looking test.",
        interpretation:
          "Thứ tự ngăn tháng tương lai dạy mô hình về tháng quá khứ. Dự án thật còn cần group theo entity, deduplicate và thêm time gap nếu outcome chồng lấn.",
        challenge:
          "Chuyển tháng 10 vào training. Giải thích vì sao tuyên bố validation thay đổi dù số row gần như không đổi.",
      },
      quiz: [
        {
          question: "Điều gì xảy ra khi kết quả test liên tục dẫn dắt thay đổi mô hình?",
          options: [
            "Test set trở nên lớn hơn",
            "Test set thực chất trở thành validation data",
            "Training trở nên không bias",
            "Không còn cần cross-validation",
          ],
          answer: 1,
          explanation:
            "Nhóm thích nghi theo feedback test, nên kết quả cuối không còn là ước lượng độc lập.",
        },
        {
          question: "Split nào phù hợp nhất để dự đoán delivery tương lai?",
          options: [
            "Random row từ mọi tháng",
            "Giữ các tháng sau ngoài training các tháng trước",
            "Giữ lại các đơn nhỏ nhất",
            "Sắp row theo model score",
          ],
          answer: 1,
          explanation:
            "Holdout theo thời gian khớp hướng của tuyên bố dự kiến và tránh học từ tương lai.",
        },
      ],
      trend: {
        title: "Evaluation đang chuyển từ một score sang thiết kế đo lường rõ ràng",
        body:
          "Thực hành hiện nay nhấn mạnh population, time window, grouping, uncertainty và decision target đứng sau score. Benchmark ít hữu ích nếu giả định không khớp deployment; evaluation mạnh phải làm các giả định đó nhìn thấy được.",
        watch: [
          "Dùng time-aware hoặc group-aware resampling khi row không exchangeable.",
          "Báo variation qua fold hoặc time window, không chỉ mean.",
          "Viết chính xác population và giai đoạn được test hỗ trợ.",
        ],
        references: ["sklearn-time-series-split", "nist-evaluation-2026"],
      },
    },
    "metrics-and-thresholds": {
      estimatedMinutes: "22",
      purpose:
        "Chương này biến predictive score thành quyết định vận hành. Bạn sẽ tính lỗi, capacity, chất lượng xác suất và slice trước khi chọn threshold.",
      thinkingFlow: [
        { label: "Score", detail: "Mô hình xếp hạng từng case mạnh đến đâu?" },
        { label: "Threshold", detail: "Điểm nào biến score thành cảnh báo?" },
        { label: "Ràng buộc", detail: "Chi phí và review capacity nào áp dụng?" },
        { label: "Hành động", detail: "Operating point nào sẽ được giám sát?" },
      ],
      practice: {
        title: "Chọn threshold khi capacity bị giới hạn",
        setup:
          "Code đánh giá ba threshold bằng weighted error cost, sau đó loại threshold tạo nhiều cảnh báo hơn số đơn nhóm có thể review.",
        interpretation:
          "Threshold 0,5 không phải chân lý phổ quát. Nó chỉ thắng với score, label, cost và capacity này; cả bốn có thể đổi trong production.",
        challenge:
          "Tăng capacity từ 4 lên 5. Threshold nào được chọn, và vì sao resource vận hành làm thay đổi quyết định mô hình?",
      },
      quiz: [
        {
          question: "Vì sao 0,5 không tự động là threshold đúng?",
          options: [
            "Xác suất không thể lớn hơn 0,5",
            "Operating point phụ thuộc cost, capacity, prevalence và calibration",
            "Mọi classifier chỉ output label",
            "Threshold làm đổi training feature",
          ],
          answer: 1,
          explanation:
            "Threshold là decision policy đặt trên score và phải phù hợp bối cảnh vận hành.",
        },
        {
          question: "Probability calibration tốt gần 0,8 có nghĩa gì?",
          options: [
            "Mọi dự đoán đều đúng",
            "Khoảng 80% case tương tự thực sự positive",
            "Recall đúng bằng 0,8",
            "Threshold phải là 0,8",
          ],
          answer: 1,
          explanation:
            "Calibration nối mức xác suất dự đoán với tần suất quan sát; nó không tự chọn action threshold.",
        },
      ],
      trend: {
        title: "Threshold tuning và calibration đang thành stage độc lập",
        body:
          "Tool hiện nay ngày càng tách score estimation khỏi action rule. Nhóm tune threshold bằng cross-validation, kiểm tra probability calibration và đánh giá cost cùng slice thay vì nhận cut-off mặc định của thư viện.",
        watch: [
          "Fit hoặc tune threshold mà không chạm final test set.",
          "Kiểm tra calibration trước khi hiểu score như xác suất.",
          "Xem lại threshold khi prevalence, cost hoặc capacity đổi.",
        ],
        references: ["sklearn-threshold-tuning", "sklearn-calibration"],
      },
    },
    "bias-variance-and-overfitting": {
      estimatedMinutes: "20",
      purpose:
        "Chương này biến 'score xấu' thành diagnosis. Bạn sẽ so sánh train với validation, phân biệt underfitting, overfitting hoặc shift và chọn một controlled experiment.",
      thinkingFlow: [
        { label: "Bằng chứng", detail: "Train và validation score di chuyển thế nào?" },
        { label: "Khoảng cách", detail: "Cả hai yếu, cả hai tốt hay cách xa nhau?" },
        { label: "Diagnosis", detail: "Bias, variance, noise hay distribution shift?" },
        { label: "Experiment", detail: "Một thay đổi nào kiểm tra được diagnosis?" },
      ],
      practice: {
        title: "Chọn complexity từ validation evidence",
        setup:
          "Ví dụ so sánh train và validation score khi complexity tăng rồi chọn validation result mạnh nhất thay vì training result mạnh nhất.",
        interpretation:
          "Training tiếp tục tốt sau complexity 3 trong khi validation giảm. Pattern đó hỗ trợ diagnosis overfitting, không phải yêu cầu tăng complexity nữa.",
        challenge:
          "Tăng validation score tại complexity 4 lên 0,85. Lựa chọn và train-validation gap thay đổi thế nào?",
      },
      quiz: [
        {
          question: "Pattern nào gợi ý high variance mạnh nhất?",
          options: [
            "Training và validation đều yếu",
            "Training mạnh nhưng validation yếu hơn nhiều",
            "Training và validation giống hệt nhau",
            "Model file nhỏ",
          ],
          answer: 1,
          explanation:
            "Train-validation gap kéo dài cho thấy fitted rule phụ thuộc quá mạnh vào training sample.",
        },
        {
          question: "Bước tiếp theo tốt nhất sau khi chẩn đoán overfitting là gì?",
          options: [
            "Đổi nhiều setting cùng lúc",
            "Chạy một controlled experiment gắn với diagnosis",
            "Báo training score",
            "Xem test set sau mỗi thay đổi",
          ],
          answer: 1,
          explanation:
            "Một thay đổi có kiểm soát như regularization mạnh hơn hoặc data phù hợp hơn làm diagnosis có thể bị bác bỏ.",
        },
      ],
      trend: {
        title: "Capability tăng nhưng reliability và efficiency ngày càng quyết định giá trị",
        body:
          "Mô hình lớn và pretrained mở rộng khả năng, nhưng so sánh hiện nay ngày càng gồm cost, stability, latency và domain performance. Learning curve cùng baseline vẫn quan trọng vì scale model hoặc dataset không tự động là thí nghiệm tiếp theo tốt nhất.",
        watch: [
          "Đo fit và inference cost cùng statistical performance.",
          "So sánh adaptation của pretrained model với baseline đơn giản theo task.",
          "Dừng scale khi validation plateau hoặc operating cost chi phối.",
        ],
        references: ["sklearn-learning-curves", "stanford-ai-index-2026"],
      },
    },
    "end-to-end-ml-workflow": {
      estimatedMinutes: "24",
      purpose:
        "Chương này nối mô hình với một hệ thống sống. Bạn sẽ định nghĩa contract, version, fallback, thu outcome đến trễ và owner cho từng monitoring signal.",
      thinkingFlow: [
        { label: "Contract", detail: "Input, output, owner và giới hạn nào được cam kết?" },
        { label: "Quyết định", detail: "Model version và threshold nào đang active?" },
        { label: "Fallback", detail: "Điều gì xảy ra khi evidence hoặc service không an toàn?" },
        { label: "Learning loop", detail: "Monitoring và delayed outcome kích hoạt thay đổi thế nào?" },
      ],
      practice: {
        title: "Chặn serving bằng một data monitor nhỏ",
        setup:
          "Ví dụ so sánh production batch với kỳ vọng tham chiếu. Missing rate cao hoặc mean shift lớn sẽ hold model và bật rule-based fallback.",
        interpretation:
          "Monitor không chứng minh predictive quality giảm vì label chưa tới. Nó cung cấp investigation signal và phản ứng vận hành an toàn.",
        challenge:
          "Thay missing value bằng 40 và 43. Mô hình có serve không? Vẫn cần thêm check nào?",
      },
      quiz: [
        {
          question: "Deployment bắt đầu điều gì?",
          options: [
            "Giai đoạn không cần evaluation",
            "Vòng vận hành gồm monitoring, outcome, diagnosis và controlled update",
            "Tự retrain sau mọi prediction",
            "Loại bỏ fallback",
          ],
          answer: 1,
          explanation:
            "Production tạo bằng chứng và failure mode mới; deployment bắt đầu learning-and-control loop.",
        },
        {
          question: "Drift alert nên làm gì trước khi label tới?",
          options: [
            "Chứng minh mô hình inaccurate",
            "Kích hoạt investigation và safe response đã định trước",
            "Retrain ngay trên mọi row mới",
            "Xóa model trước",
          ],
          answer: 1,
          explanation:
            "Input drift là investigation signal, không phải bằng chứng trực tiếp của outcome degradation. Phản ứng phải theo runbook đã review.",
        },
      ],
      trend: {
        title: "Post-deployment monitoring là thiết yếu và vẫn đang trưởng thành",
        body:
          "Hướng dẫn hiện nay xem deployed AI là socio-technical system cần giám sát input, feature, service behavior, slice, real-world outcome và unexpected effect. NIST gần đây cũng lưu ý thuật ngữ và best practice đã kiểm chứng còn phân tán, nên nhóm cần runbook và human ownership rõ ràng.",
        watch: [
          "Giám sát riêng schema, missingness, feature skew, latency và business outcome.",
          "Giữ fallback đảo ngược được và version model, data, threshold cùng code.",
          "Xem alert là hypothesis có owner, evidence và escalation rule.",
        ],
        references: ["google-production-monitoring", "nist-monitoring-2026", "nist-ai-rmf"],
      },
    },
  },
  ko: {
    "what-machine-learning-learns": {
      estimatedMinutes: "18",
      purpose:
        "이 장은 모델부터 고르는 사고를 막습니다. 현실의 결과를 행동과 연결하고, 무엇을 예측해야 하는지 정의하며, 시스템 사용을 정당화할 근거를 결정합니다.",
      thinkingFlow: [
        { label: "결과", detail: "현실에서 무엇이 개선되어야 할까요?" },
        { label: "행동", detail: "사람이나 시스템이 실제로 무엇을 할 수 있나요?" },
        { label: "예측", detail: "어떤 미지의 값이 그 행동을 도울까요?" },
        { label: "근거", detail: "어떤 비교가 배포를 정당화할까요?" },
      ],
      practice: {
        title: "기준선과 후보 의사결정 규칙 비교",
        setup:
          "외부 패키지 없이 실행되는 Python 예제입니다. 배송 지연 누락 비용이 오경보의 네 배이므로 정확도만으로 결정할 수 없습니다.",
        interpretation:
          "후보는 오경보가 더 많지만 가중 운영 비용을 절반으로 줄입니다. 비용 가정과 표본이 현실을 대표할 때만 가치의 근거가 됩니다.",
        challenge:
          "누락 비용을 8에서 3으로 바꾸세요. 선호 규칙이 바뀌나요? 어떤 사업 가정을 시험한 것인가요?",
      },
      quiz: [
        {
          question: "가장 먼저 써야 할 문장은 무엇인가요?",
          options: [
            "그래디언트 부스팅을 사용한다",
            "예방 가능한 배송 지연을 줄인다",
            "정확도 95%를 달성한다",
            "사용 가능한 모든 필드를 수집한다",
          ],
          answer: 1,
          explanation:
            "비 ML 결과가 먼저입니다. 모델, 지표, 특징은 그 결과를 위한 선택입니다.",
        },
        {
          question: "단순한 기준선이 가장 유용한 역할은 무엇인가요?",
          options: [
            "복잡한 모델이 실패한 뒤에만 사용",
            "복잡성이 가치를 더하는지 보여 주는 대조군",
            "균형 데이터에서만 사용",
            "평가 데이터가 없을 때 사용",
          ],
          answer: 1,
          explanation:
            "기준선은 실험을 비교로 만들고 누수, 불균형, 약한 성공 정의를 드러냅니다.",
        },
      ],
      trend: {
        title: "의사결정 중심 ML은 더 많은 해결 방식과 비교합니다",
        body:
          "현재 팀은 시스템을 만들기 전에 휴리스틱, 예측 ML, 생성형 AI, 자동화 모델링을 비교합니다. 유행 모델 이름보다 선택한 방식과 결과, 제약, 행동, 별도 성공 지표를 연결하는 능력이 오래갑니다.",
        watch: [
          "제품 성공 지표와 오프라인 모델 지표를 분리하세요.",
          "대리 레이블을 행동을 바꿀 수 있는 가정으로 다루세요.",
          "단순 규칙이 여전히 경쟁력 있는지 다시 확인하세요.",
        ],
        references: ["google-problem-framing", "google-ml-crash-course"],
      },
    },
    "data-features-and-labels": {
      estimatedMinutes: "20",
      purpose:
        "이 장은 표를 그것을 만든 과정으로 되돌립니다. 측정 선택을 찾고, 의사결정 시점 경계를 적용하며, 레이블이 운영적 대리값이 되는 과정을 기록합니다.",
      thinkingFlow: [
        { label: "사건", detail: "현실 과정에서 무엇이 일어났나요?" },
        { label: "측정", detail: "누구를 위해 어떤 방식으로 기록했나요?" },
        { label: "가용성", detail: "의사결정 시점에 이미 있던 값인가요?" },
        { label: "데이터셋", detail: "어떤 버전의 행과 레이블이 학습에 들어가나요?" },
      ],
      practice: {
        title: "의사결정 시점 경계 적용",
        setup:
          "각 필드가 생기는 시점을 기록하고 경보 전에 알려진 특징만 선택하는 예제입니다.",
        interpretation:
          "delivered_at은 지연을 잘 예측하지만 결정 후에 생기므로 제외됩니다. 예측력이 불가능한 특징을 유효하게 만들 수는 없습니다.",
        challenge:
          "25분에 제공되는 일기예보와 600분에 확인되는 실제 강수량을 추가하세요. 어느 특징을 모델에 넣어야 하나요?",
      },
      quiz: [
        {
          question: "타깃 누수를 가장 일으키기 쉬운 필드는 무엇인가요?",
          options: [
            "결제 시점의 거리",
            "출고 전 운송사 용량",
            "최종 배송 시각",
            "도착 지역",
          ],
          answer: 2,
          explanation:
            "최종 배송 시각은 경보 결정 뒤에 생성되고 결과를 직접 드러냅니다.",
        },
        {
          question: "레이블이 운영적 대리값인 이유는 무엇인가요?",
          options: [
            "항상 숫자이기 때문",
            "기록 규칙이 관심 있는 현실 개념을 근사하기 때문",
            "모델이 실제 결과를 학습하지 못하기 때문",
            "모든 레이블을 사람이 만들기 때문",
          ],
          answer: 1,
          explanation:
            "레이블은 정의, 측정 과정, 시점, 결측에 의존하며 현실 개념 그 자체가 아닙니다.",
        },
      ],
      trend: {
        title: "데이터 계약과 운영 일치가 핵심 모델 업무가 되고 있습니다",
        body:
          "현대 ML은 스키마, 계보, 레이블 정책, 특징 가용성, 학습-서빙 일치를 제품 인터페이스로 다룹니다. 깨끗한 전체 지표가 누락되거나 과소대표된 집단을 숨길 수 있어 의미 있는 슬라이스별 데이터 품질도 검사합니다.",
        watch: [
          "레이블 규칙과 특징 계산을 데이터셋과 함께 버전 관리하세요.",
          "학습과 서빙에서 같은 스키마와 변환을 검사하세요.",
          "운영 슬라이스별 결측과 대표성을 모니터링하세요.",
        ],
        references: ["google-production-monitoring", "nist-ai-rmf"],
      },
    },
    "train-validation-and-test": {
      estimatedMinutes: "22",
      purpose:
        "이 장은 만들려는 주장을 보호합니다. 배포 조건을 분할 제약으로 바꾸고 모델 선택과 최종 테스트를 분리하며 결과가 어떤 미래를 대표하는지 명시합니다.",
      thinkingFlow: [
        { label: "배포", detail: "누구를 어디서 언제 예측하나요?" },
        { label: "제약", detail: "시간, 그룹, 중복 경계 중 무엇이 중요한가요?" },
        { label: "선택", detail: "검증 결과가 무엇에 영향을 줄 수 있나요?" },
        { label: "주장", detail: "건드리지 않은 어떤 테스트 결과를 보고하나요?" },
      ],
      practice: {
        title: "시간 순서 분할 만들기",
        setup:
          "첫 8개월은 적합, 다음 2개월은 선택, 마지막 2개월은 한 번의 미래 지향 테스트에 사용합니다.",
        interpretation:
          "미래 달이 과거 달을 가르치지 못하게 합니다. 실제 프로젝트는 개체 그룹, 중복 제거, 결과가 겹칠 때의 시간 간격도 필요합니다.",
        challenge:
          "10월을 학습으로 옮기세요. 행 수는 거의 같지만 검증 주장이 왜 달라지는지 설명하세요.",
      },
      quiz: [
        {
          question: "테스트 결과가 반복해서 모델 변경을 이끌면 어떻게 되나요?",
          options: [
            "테스트셋이 커집니다",
            "테스트셋이 사실상 검증 데이터가 됩니다",
            "학습 편향이 사라집니다",
            "교차검증이 필요 없어집니다",
          ],
          answer: 1,
          explanation:
            "팀이 테스트 피드백에 적응하므로 최종 결과가 더 이상 독립 추정치가 아닙니다.",
        },
        {
          question: "미래 배송 예측을 가장 잘 뒷받침하는 분할은 무엇인가요?",
          options: [
            "모든 달에서 무작위 행",
            "이전 달 학습 뒤 이후 달을 보류",
            "가장 작은 주문 보류",
            "모델 점수순 행 정렬",
          ],
          answer: 1,
          explanation:
            "시간 순서 홀드아웃은 의도한 주장의 방향과 맞고 미래 학습을 피합니다.",
        },
      ],
      trend: {
        title: "평가는 하나의 점수에서 명시적 측정 설계로 이동합니다",
        body:
          "현재 실무는 점수 뒤의 모집단, 기간, 그룹, 불확실성, 의사결정 목표를 강조합니다. 벤치마크 가정이 배포와 맞지 않으면 숫자의 의미가 약하므로 강건한 평가는 가정을 드러내야 합니다.",
        watch: [
          "행이 교환 가능하지 않으면 시간 또는 그룹 인식 재표본을 사용하세요.",
          "평균뿐 아니라 폴드나 기간별 변동을 보고하세요.",
          "테스트가 지지하는 모집단과 기간을 정확히 쓰세요.",
        ],
        references: ["sklearn-time-series-split", "nist-evaluation-2026"],
      },
    },
    "metrics-and-thresholds": {
      estimatedMinutes: "22",
      purpose:
        "이 장은 예측 점수를 운영 결정으로 바꿉니다. 임곗값을 고르기 전에 오류, 처리 용량, 확률 품질, 슬라이스를 계산합니다.",
      thinkingFlow: [
        { label: "점수", detail: "모델이 각 사례를 얼마나 강하게 순위화하나요?" },
        { label: "임곗값", detail: "어디서 점수가 경보가 되나요?" },
        { label: "제약", detail: "어떤 비용과 검토 용량이 적용되나요?" },
        { label: "행동", detail: "어떤 운영점을 모니터링하나요?" },
      ],
      practice: {
        title: "제한된 용량에서 임곗값 선택",
        setup:
          "세 임곗값의 가중 오류 비용을 평가하고 팀의 검토 용량보다 많은 주문을 표시하는 선택은 제외합니다.",
        interpretation:
          "선택된 0.5는 보편적 진리가 아닙니다. 이 점수, 레이블, 비용, 용량에서만 이기며 네 요소 모두 운영에서 바뀔 수 있습니다.",
        challenge:
          "용량을 4에서 5로 늘리세요. 어떤 임곗값이 선택되며 운영 자원이 왜 모델 결정을 바꾸나요?",
      },
      quiz: [
        {
          question: "0.5가 자동으로 올바른 임곗값이 아닌 이유는 무엇인가요?",
          options: [
            "확률은 0.5보다 클 수 없기 때문",
            "운영점이 비용, 용량, 유병률, 보정에 의존하기 때문",
            "모든 분류기는 레이블만 출력하기 때문",
            "임곗값이 학습 특징을 바꾸기 때문",
          ],
          answer: 1,
          explanation:
            "임곗값은 점수 위의 의사결정 정책이며 운영 맥락과 맞아야 합니다.",
        },
        {
          question: "0.8 부근의 좋은 확률 보정은 무엇을 뜻하나요?",
          options: [
            "모든 예측이 정답",
            "비슷한 사례의 약 80%가 실제 양성",
            "재현율이 정확히 0.8",
            "임곗값이 반드시 0.8",
          ],
          answer: 1,
          explanation:
            "보정은 예측 확률과 관측 빈도를 연결하며 행동 임곗값을 대신 선택하지 않습니다.",
        },
      ],
      trend: {
        title: "임곗값 조정과 보정이 독립된 모델 단계가 되고 있습니다",
        body:
          "최신 도구는 점수 추정과 행동 규칙을 분리합니다. 팀은 교차검증으로 임곗값을 조정하고 확률 보정을 확인하며 라이브러리 기본값 대신 비용과 슬라이스를 평가합니다.",
        watch: [
          "최종 테스트를 건드리지 않고 임곗값을 적합하거나 조정하세요.",
          "점수를 확률로 해석하기 전에 보정을 확인하세요.",
          "유병률, 비용, 용량이 바뀌면 임곗값을 다시 검토하세요.",
        ],
        references: ["sklearn-threshold-tuning", "sklearn-calibration"],
      },
    },
    "bias-variance-and-overfitting": {
      estimatedMinutes: "20",
      purpose:
        "이 장은 '점수가 나쁘다'를 진단으로 바꿉니다. 학습과 검증 근거를 비교하고 과소적합, 과적합, 이동을 구분한 뒤 하나의 통제 실험을 선택합니다.",
      thinkingFlow: [
        { label: "근거", detail: "학습과 검증 점수가 어떻게 움직이나요?" },
        { label: "간극", detail: "둘 다 약한가요, 건강한가요, 멀리 떨어졌나요?" },
        { label: "진단", detail: "편향, 분산, 잡음, 분포 이동 중 무엇인가요?" },
        { label: "실험", detail: "어떤 한 변화가 진단을 시험할까요?" },
      ],
      practice: {
        title: "검증 근거로 복잡도 선택",
        setup:
          "복잡도가 늘 때 학습과 검증 점수를 비교하고 가장 높은 학습 결과가 아니라 가장 높은 검증 결과를 선택합니다.",
        interpretation:
          "복잡도 3 이후 학습은 계속 좋아지지만 검증은 하락합니다. 이는 더 큰 복잡도가 아니라 과적합 진단을 지지합니다.",
        challenge:
          "복잡도 4의 검증 점수를 0.85로 올리세요. 선택과 학습-검증 간극이 어떻게 바뀌나요?",
      },
      quiz: [
        {
          question: "높은 분산을 가장 강하게 시사하는 패턴은 무엇인가요?",
          options: [
            "학습과 검증 성능이 모두 약함",
            "학습은 강하지만 검증이 훨씬 약함",
            "학습과 검증이 완전히 같음",
            "모델 파일이 작음",
          ],
          answer: 1,
          explanation:
            "지속적인 학습-검증 간극은 적합 규칙이 학습 표본에 지나치게 의존함을 시사합니다.",
        },
        {
          question: "과적합 진단 뒤 가장 좋은 다음 단계는 무엇인가요?",
          options: [
            "여러 설정을 함께 변경",
            "진단과 연결된 하나의 통제 실험",
            "학습 점수 보고",
            "매 변경마다 테스트셋 확인",
          ],
          answer: 1,
          explanation:
            "더 강한 규제나 관련 데이터처럼 하나의 통제 변화가 진단을 반증 가능하게 만듭니다.",
        },
      ],
      trend: {
        title: "능력은 상승하지만 신뢰성과 효율이 유용성을 더 좌우합니다",
        body:
          "대형·사전학습 모델이 가능한 과업을 넓히지만 현재 비교에는 비용, 안정성, 지연, 도메인 성능이 더 많이 포함됩니다. 모델이나 데이터를 키우는 것이 자동으로 최선의 다음 실험은 아니므로 학습 곡선과 통제 기준선은 여전히 중요합니다.",
        watch: [
          "통계 성능과 함께 적합·추론 비용을 측정하세요.",
          "사전학습 모델 적응과 단순 과업별 기준선을 비교하세요.",
          "검증이 정체되거나 운영 비용이 지배하면 확장을 멈추세요.",
        ],
        references: ["sklearn-learning-curves", "stanford-ai-index-2026"],
      },
    },
    "end-to-end-ml-workflow": {
      estimatedMinutes: "24",
      purpose:
        "이 장은 모델을 살아 있는 시스템과 연결합니다. 계약, 버전, 대체 행동, 늦게 도착하는 결과 수집, 각 모니터링 신호의 담당자를 정의합니다.",
      thinkingFlow: [
        { label: "계약", detail: "어떤 입력, 출력, 담당자, 한계를 약속하나요?" },
        { label: "결정", detail: "어떤 모델 버전과 임곗값이 활성화되나요?" },
        { label: "대체", detail: "근거나 서비스가 안전하지 않을 때 무엇을 하나요?" },
        { label: "학습 순환", detail: "모니터링과 지연 결과가 변화를 어떻게 촉발하나요?" },
      ],
      practice: {
        title: "작은 데이터 모니터로 서빙 게이트 만들기",
        setup:
          "운영 배치를 기준 기대와 비교합니다. 높은 결측률이나 큰 평균 이동이 있으면 모델을 보류하고 규칙 기반 대체를 사용합니다.",
        interpretation:
          "레이블이 아직 없으므로 모니터가 예측 품질 하락을 증명하지는 않습니다. 조사 신호와 안전한 운영 대응을 제공합니다.",
        challenge:
          "결측값을 40과 43으로 바꾸세요. 모델이 서빙되나요? 어떤 추가 검사가 여전히 필요한가요?",
      },
      quiz: [
        {
          question: "배포는 무엇을 시작하나요?",
          options: [
            "평가가 필요 없는 기간",
            "모니터링, 결과, 진단, 통제된 갱신의 운영 순환",
            "모든 예측 후 자동 재학습",
            "대체 수단 제거",
          ],
          answer: 1,
          explanation:
            "운영은 새로운 근거와 실패 유형을 만들므로 배포가 학습·통제 순환의 시작입니다.",
        },
        {
          question: "레이블 도착 전 이동 경보는 무엇을 해야 하나요?",
          options: [
            "모델 부정확성을 증명",
            "조사와 미리 정의한 안전 대응을 촉발",
            "모든 새 행으로 즉시 재학습",
            "이전 모델 삭제",
          ],
          answer: 1,
          explanation:
            "입력 이동은 결과 성능 저하의 직접 증거가 아니라 조사 신호입니다. 검토된 런북을 따라 대응해야 합니다.",
        },
      ],
      trend: {
        title: "배포 후 모니터링은 필수이며 아직 성숙 중입니다",
        body:
          "현재 지침은 배포 AI를 입력, 특징, 서비스 동작, 슬라이스, 현실 결과, 예상 밖 영향을 모니터링해야 하는 사회기술 시스템으로 봅니다. 최근 NIST는 용어와 검증된 모범 사례가 여전히 흩어져 있다고 지적하므로 명시적 런북과 사람의 책임이 필요합니다.",
        watch: [
          "스키마, 결측, 특징 왜곡, 지연, 사업 결과를 따로 모니터링하세요.",
          "되돌릴 수 있는 대체 수단과 모델·데이터·임곗값·코드 버전을 유지하세요.",
          "경보를 담당자, 근거, 에스컬레이션 규칙이 있는 가설로 다루세요.",
        ],
        references: ["google-production-monitoring", "nist-monitoring-2026", "nist-ai-rmf"],
      },
    },
  },
};

export const guidedDepthUi = {
  en: {
    bigPicture: "Big picture",
    whereYouAre: "Where you are",
    purpose: "Purpose",
    thinkingFlow: "Flow of thinking",
    courseMap: "Six-chapter course map",
    currentStep: "You are here",
    tryIt: "Try it yourself",
    python: "Python · no dependencies",
    expected: "Expected output",
    interpretation: "What the result means",
    challenge: "Change one thing",
    quiz: "MCQ review",
    chooseBeforeReveal: "Choose an answer before revealing the reasoning.",
    question: "Question",
    showAnswer: "Show answer",
    correctAnswer: "Correct answer",
    currentTrend: "Current practice",
    asOf: "Reviewed July 2026",
    watch: "What to watch",
  },
  vi: {
    bigPicture: "Bức tranh lớn",
    whereYouAre: "Bạn đang ở đâu",
    purpose: "Mục đích",
    thinkingFlow: "Luồng tư duy",
    courseMap: "Bản đồ khóa học sáu chương",
    currentStep: "Bạn đang ở đây",
    tryIt: "Tự mình thử",
    python: "Python · không cần thư viện",
    expected: "Output dự kiến",
    interpretation: "Kết quả có nghĩa gì",
    challenge: "Thay đổi một điều",
    quiz: "Ôn tập MCQ",
    chooseBeforeReveal: "Hãy chọn đáp án trước khi mở phần lập luận.",
    question: "Câu",
    showAnswer: "Xem đáp án",
    correctAnswer: "Đáp án đúng",
    currentTrend: "Thực hành hiện nay",
    asOf: "Đã rà soát tháng 7/2026",
    watch: "Điểm cần theo dõi",
  },
  ko: {
    bigPicture: "큰 그림",
    whereYouAre: "현재 위치",
    purpose: "목적",
    thinkingFlow: "사고 흐름",
    courseMap: "여섯 장 코스 지도",
    currentStep: "현재 단계",
    tryIt: "직접 해보기",
    python: "Python · 외부 패키지 없음",
    expected: "예상 출력",
    interpretation: "결과의 의미",
    challenge: "한 가지 바꾸기",
    quiz: "객관식 복습",
    chooseBeforeReveal: "추론을 열기 전에 답을 선택해 보세요.",
    question: "문제",
    showAnswer: "정답 보기",
    correctAnswer: "정답",
    currentTrend: "현재 실무",
    asOf: "2026년 7월 검토",
    watch: "살펴볼 점",
  },
} satisfies Record<CourseLanguage, Record<string, string>>;

export function getGuidedDepth(
  language: CourseLanguage,
  slug: string,
) {
  if (!(slug in guidedDepth[language])) return undefined;
  return guidedDepth[language][slug as GuidedSlug];
}

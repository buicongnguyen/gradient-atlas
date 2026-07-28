import type { CSSProperties, ReactNode } from "react";
import type { Language } from "../data/content";

const diagramSlugs = [
  "data-leakage",
  "train-validation-and-test",
  "confusion-matrix",
  "linear-regression",
  "bias-variance-and-overfitting",
  "end-to-end-ml-workflow",
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
};

const licenseCopy: Record<Language, string> = {
  en: "Original Gradient Atlas illustration · CC BY 4.0",
  vi: "Minh họa gốc của Gradient Atlas · CC BY 4.0",
  ko: "Gradient Atlas 원본 도해 · CC BY 4.0",
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
        <span>VISUAL MODEL</span>
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

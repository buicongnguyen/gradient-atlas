"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Language, Lesson, roadmap, ui } from "../data/content";
import { ArrowUpRight, Check, CircleDot } from "./icons";

const labCopy = {
  en: {
    split: "Split designer",
    splitBody: "Reserve evidence before choosing the model.",
    test: "Test share",
    train: "Train",
    validation: "Validation",
    metric: "Threshold lab",
    metricBody: "Move the threshold to exchange recall for precision.",
    threshold: "Decision threshold",
    precision: "Precision",
    recall: "Recall",
    generalization: "Generalization lab",
    generalizationBody: "Complexity lowers training error before it widens the gap.",
    complexity: "Model complexity",
    trainError: "Train error",
    validationError: "Validation error",
    gap: "Generalization gap",
  },
  vi: {
    split: "Thiết kế phép chia",
    splitBody: "Giữ lại bằng chứng trước khi chọn mô hình.",
    test: "Tỷ lệ kiểm thử",
    train: "Huấn luyện",
    validation: "Thẩm định",
    metric: "Phòng lab ngưỡng",
    metricBody: "Di chuyển ngưỡng để quan sát đánh đổi recall và precision.",
    threshold: "Ngưỡng quyết định",
    precision: "Precision",
    recall: "Recall",
    generalization: "Phòng lab khái quát",
    generalizationBody: "Độ phức tạp giảm lỗi train trước khi làm khoảng cách rộng ra.",
    complexity: "Độ phức tạp mô hình",
    trainError: "Lỗi train",
    validationError: "Lỗi validation",
    gap: "Khoảng cách khái quát",
  },
  ko: {
    split: "분할 설계기",
    splitBody: "모델을 선택하기 전에 평가 증거를 남겨 두세요.",
    test: "테스트 비율",
    train: "학습",
    validation: "검증",
    metric: "임곗값 실험실",
    metricBody: "임곗값을 움직여 재현율과 정밀도의 절충을 확인하세요.",
    threshold: "결정 임곗값",
    precision: "정밀도",
    recall: "재현율",
    generalization: "일반화 실험실",
    generalizationBody: "복잡도는 학습 오차를 낮추다가 일반화 간극을 키웁니다.",
    complexity: "모델 복잡도",
    trainError: "학습 오차",
    validationError: "검증 오차",
    gap: "일반화 간극",
  },
} satisfies Record<Language, Record<string, string>>;

function SplitLab({ language }: { language: Language }) {
  const [testShare, setTestShare] = useState(20);
  const validationShare = 20;
  const trainShare = 100 - testShare - validationShare;
  const copy = labCopy[language];
  const segments = Array.from({ length: 20 }, (_, index) => {
    const percent = (index + 1) * 5;
    if (percent <= trainShare) return "train";
    if (percent <= trainShare + validationShare) return "validation";
    return "test";
  });

  return (
    <article className="lab-card split-lab">
      <div className="lab-card-head">
        <span>01</span>
        <div><h3>{copy.split}</h3><p>{copy.splitBody}</p></div>
      </div>
      <div className="split-strip" aria-label={`${trainShare}% train, ${validationShare}% validation, ${testShare}% test`}>
        {segments.map((kind, index) => <i className={kind} key={index} />)}
      </div>
      <div className="lab-legend">
        <span><i className="train" />{copy.train} <b>{trainShare}%</b></span>
        <span><i className="validation" />{copy.validation} <b>{validationShare}%</b></span>
        <span><i className="test" />Test <b>{testShare}%</b></span>
      </div>
      <label className="range-control">
        <span>{copy.test}<b>{testShare}%</b></span>
        <input type="range" min="10" max="40" step="5" value={testShare} onChange={(event) => setTestShare(Number(event.target.value))} />
      </label>
    </article>
  );
}

function MetricLab({ language }: { language: Language }) {
  const [threshold, setThreshold] = useState(50);
  const copy = labCopy[language];
  const values = useMemo(() => {
    const tp = Math.max(10, Math.round(100 - threshold * 0.72));
    const fn = 100 - tp;
    const fp = Math.max(3, Math.round(82 - threshold * 0.78));
    const tn = 100 - fp;
    return {
      tp, fn, fp, tn,
      precision: Math.round((tp / (tp + fp)) * 100),
      recall: Math.round((tp / (tp + fn)) * 100),
    };
  }, [threshold]);

  return (
    <article className="lab-card">
      <div className="lab-card-head">
        <span>02</span>
        <div><h3>{copy.metric}</h3><p>{copy.metricBody}</p></div>
      </div>
      <div className="metric-readout">
        <div><small>{copy.precision}</small><strong>{values.precision}%</strong><i style={{ width: `${values.precision}%` }} /></div>
        <div><small>{copy.recall}</small><strong>{values.recall}%</strong><i style={{ width: `${values.recall}%` }} /></div>
      </div>
      <div className="confusion-grid" aria-label="Confusion matrix">
        <span className="good">TP <b>{values.tp}</b></span>
        <span>FP <b>{values.fp}</b></span>
        <span>FN <b>{values.fn}</b></span>
        <span className="good">TN <b>{values.tn}</b></span>
      </div>
      <label className="range-control">
        <span>{copy.threshold}<b>{threshold}%</b></span>
        <input type="range" min="20" max="80" step="2" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} />
      </label>
    </article>
  );
}

function GeneralizationLab({ language }: { language: Language }) {
  const [complexity, setComplexity] = useState(5);
  const copy = labCopy[language];
  const trainError = Math.max(4, Math.round(38 - complexity * 3.2));
  const validationError = Math.round(16 + Math.pow(complexity - 5, 2) * 0.9);
  const gap = Math.max(0, validationError - trainError);

  return (
    <article className="lab-card">
      <div className="lab-card-head">
        <span>03</span>
        <div><h3>{copy.generalization}</h3><p>{copy.generalizationBody}</p></div>
      </div>
      <div className="curve-stage" aria-label={`${copy.trainError} ${trainError}%, ${copy.validationError} ${validationError}%`}>
        <div className="curve-axis" />
        <div className="curve train-curve" style={{ height: `${100 - trainError}%` }}><span>{copy.trainError}</span></div>
        <div className="curve validation-curve" style={{ height: `${100 - validationError}%` }}><span>{copy.validationError}</span></div>
      </div>
      <div className="gap-readout"><span>{copy.gap}</span><strong>{gap} pts</strong></div>
      <label className="range-control">
        <span>{copy.complexity}<b>{complexity}/10</b></span>
        <input type="range" min="1" max="10" step="1" value={complexity} onChange={(event) => setComplexity(Number(event.target.value))} />
      </label>
    </article>
  );
}

export function AtlasClient({
  language,
  lessons,
}: {
  language: Language;
  lessons: Lesson[];
}) {
  const copy = ui[language];
  const featuredLessons = lessons.filter((lesson) => lesson.featured).slice(0, 6);
  return (
    <>
      <section className="hero">
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">{copy.heroEyebrow}</p>
          <h1>{copy.heroTitle}<br /><em>{copy.heroAccent}</em></h1>
          <p className="hero-body">{copy.heroBody}</p>
          <div className="hero-actions">
            <Link className="button primary" href={`/${language}/learn/${lessons[0].slug}/`}>{copy.start}<ArrowUpRight /></Link>
            <Link className="button secondary" href="#map">{copy.explore}</Link>
          </div>
          <p className="preview-note"><span />{copy.preview}</p>
        </div>
        <div className="hero-system" aria-label="Machine learning system map">
          <div className="system-center"><CircleDot /><strong>ML</strong><small>evidence loop</small></div>
          {["DATA", "SPLIT", "MODEL", "METRIC", "DECIDE", "MONITOR"].map((label, index) => (
            <span key={label} className={`system-node node-${index + 1}`}><i>{String(index + 1).padStart(2, "0")}</i>{label}</span>
          ))}
        </div>
      </section>

      <section className="page-section map-section" id="map">
        <div className="section-heading">
          <p className="eyebrow">{copy.mapEyebrow}</p>
          <h2>{copy.mapTitle}</h2>
          <p>{copy.mapBody}</p>
        </div>
        <div className="roadmap">
          {roadmap[language].map(([part, title, summary, active], index) => (
            <div className={`roadmap-card ${active ? "active" : "planned"}`} key={String(part)}>
              <div className="roadmap-top"><span>PART {part}</span><small>{active ? copy.published : copy.planned}</small></div>
              <strong>{title}</strong>
              <p>{summary}</p>
              <i>{String(index + 1).padStart(2, "0")}</i>
              {active && <Check className="roadmap-check" />}
            </div>
          ))}
        </div>
      </section>

      <section className="page-section labs-section" id="labs">
        <div className="section-heading">
          <p className="eyebrow">{copy.labEyebrow}</p>
          <h2>{copy.labTitle}</h2>
          <p>{copy.labBody}</p>
        </div>
        <div className="lab-grid">
          <SplitLab language={language} />
          <MetricLab language={language} />
          <GeneralizationLab language={language} />
        </div>
      </section>

      <section className="page-section lessons-section" id="lessons">
        <div className="section-heading">
          <p className="eyebrow">{copy.lessonEyebrow}</p>
          <h2>{copy.lessonTitle}</h2>
          <p>{copy.lessonBody}</p>
        </div>
        <div className="lesson-grid">
          {featuredLessons.map((lesson) => (
            <Link href={`/${language}/learn/${lesson.slug}/`} className="lesson-card" key={lesson.id}>
              <div className="lesson-meta"><span>PART {lesson.part}</span><small>{lesson.duration} {copy.minutes}</small></div>
              <b>{lesson.number}</b>
              <h3>{lesson.title}</h3>
              <p>{lesson.summary}</p>
              <div><span>{copy.read}</span><ArrowUpRight /></div>
            </Link>
          ))}
        </div>
        <div className="catalog-cta">
          <Link className="button primary" href={`/${language}/catalog/`}>
            {copy.catalog}<ArrowUpRight />
          </Link>
        </div>
      </section>

      <section className="page-section about-section" id="about">
        <div>
          <p className="eyebrow">{copy.aboutEyebrow}</p>
          <h2>{copy.aboutTitle}</h2>
        </div>
        <div>
          <p>{copy.aboutBody}</p>
          <div className="policy-actions">
            <span><Check />{copy.original}</span>
            <span><CircleDot />CC BY 4.0 ready</span>
            <Link href="/source-policy/">{copy.sourcePolicy}<ArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

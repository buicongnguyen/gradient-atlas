export const topicCodeBySlug: Record<string, string> = {
  "ml-problem-formulation": `orders = [
    {"distance": 12, "late": 0},
    {"distance": 65, "late": 1},
    {"distance": 42, "late": 1},
]

prediction_time = "pickup"
target = "arrival_more_than_30_minutes_late"
baseline = max(0, 1)  # majority class in real data
metric = "weighted_cost(false_alarm=2, missed_late=8)"

print(prediction_time, target, baseline, metric, sep="\\n")`,
  "data-visualization": `from collections import defaultdict

events = [("Jan", 12), ("Jan", 15), ("Feb", 14), ("Feb", 55)]
by_month = defaultdict(list)
for month, value in events:
    by_month[month].append(value)

for month, values in by_month.items():
    ordered = sorted(values)
    print(month, "min=", ordered[0], "max=", ordered[-1])`,
  "training-loop": `weight = 0.0
learning_rate = 0.1
examples = [(1.0, 2.0), (2.0, 4.0), (3.0, 6.0)]

for epoch in range(20):
    gradient = 0.0
    loss = 0.0
    for x, y in examples:
        error = weight * x - y
        loss += error ** 2
        gradient += 2 * error * x
    weight -= learning_rate * gradient / len(examples)
    if epoch % 5 == 0:
        print(epoch, round(loss / len(examples), 4), round(weight, 3))`,
  "reproducibility": `import hashlib
import json
import random

random.seed(42)
split = list(range(10))
random.shuffle(split)
run = {
    "seed": 42,
    "train_ids": split[:8],
    "test_ids": split[8:],
    "model": {"name": "baseline", "version": 1},
}
fingerprint = hashlib.sha256(json.dumps(run, sort_keys=True).encode()).hexdigest()
print(run)
print("run fingerprint:", fingerprint[:12])`,
  "confusion-matrix": `actual =    [1, 1, 1, 0, 0, 0]
predicted = [1, 0, 1, 1, 0, 0]

tp = sum(y == 1 and p == 1 for y, p in zip(actual, predicted))
fn = sum(y == 1 and p == 0 for y, p in zip(actual, predicted))
fp = sum(y == 0 and p == 1 for y, p in zip(actual, predicted))
tn = sum(y == 0 and p == 0 for y, p in zip(actual, predicted))

print({"TP": tp, "FN": fn, "FP": fp, "TN": tn})
print("precision=", tp / (tp + fp), "recall=", tp / (tp + fn))`,
  "roc-auc": `scores = [0.9, 0.7, 0.6, 0.2]
actual = [1, 0, 1, 0]

for threshold in sorted(set(scores), reverse=True):
    pred = [score >= threshold for score in scores]
    tp = sum(p and y for p, y in zip(pred, actual))
    fp = sum(p and not y for p, y in zip(pred, actual))
    positives = sum(actual)
    negatives = len(actual) - positives
    print(threshold, "TPR=", tp / positives, "FPR=", fp / negatives)`,
  "real-world-evaluation": `records = [
    {"region": "urban", "latency_ms": 18, "correct": True},
    {"region": "rural", "latency_ms": 75, "correct": False},
    {"region": "rural", "latency_ms": 64, "correct": True},
]

for region in {row["region"] for row in records}:
    part = [row for row in records if row["region"] == region]
    accuracy = sum(row["correct"] for row in part) / len(part)
    p95_proxy = max(row["latency_ms"] for row in part)
    print(region, "accuracy=", accuracy, "tail_latency=", p95_proxy)`,
  "overfitting-detection": `epochs = [1, 2, 3, 4, 5]
train_loss = [0.70, 0.45, 0.28, 0.15, 0.08]
valid_loss = [0.74, 0.50, 0.35, 0.39, 0.52]

best = min(range(len(epochs)), key=lambda i: valid_loss[i])
for i, epoch in enumerate(epochs):
    gap = valid_loss[i] - train_loss[i]
    print(epoch, "gap=", round(gap, 2))
print("restore epoch", epochs[best])`,
  "underfitting-detection": `models = [
    {"name": "constant", "train": 0.58, "valid": 0.57},
    {"name": "linear", "train": 0.61, "valid": 0.60},
    {"name": "tree", "train": 0.86, "valid": 0.79},
]

for model in models:
    gap = model["train"] - model["valid"]
    diagnosis = "underfit" if model["train"] < 0.7 else "inspect variance"
    print(model["name"], round(gap, 2), diagnosis)`,
  "practical-fitting-solutions": `experiments = [
    ("baseline", 0.78),
    ("stronger_regularization", 0.81),
    ("better_labels", 0.85),
    ("new_model", 0.82),
]

baseline = experiments[0][1]
for name, score in experiments:
    print(name, "delta=", round(score - baseline, 3))

best = max(experiments, key=lambda item: item[1])
print("promote:", best[0])`,
  "model-training": `checkpoints = []
weight = 0.0

for epoch in range(6):
    gradient = 2 * (weight - 3.0)
    weight -= 0.2 * gradient
    train_loss = (weight - 3.0) ** 2
    valid_loss = train_loss + 0.02 * epoch
    checkpoints.append((valid_loss, epoch, weight))
    print(epoch, round(train_loss, 4), round(valid_loss, 4))

best = min(checkpoints)
print("best checkpoint:", {"epoch": best[1], "weight": round(best[2], 3)})`,
  "end-to-end-project": `project = {
    "decision": "reroute orders likely to be >30 minutes late",
    "prediction_time": "pickup",
    "baseline": "flag distance > 50 km",
    "split": "train on earlier months; test on later months",
    "metric": "false_alarm * 2 + missed_late * 8",
    "fallback": "distance rule",
    "monitor": ["missing rate", "alert rate", "late outcome rate"],
}

for requirement, value in project.items():
    assert value, f"missing project contract: {requirement}"
    print(requirement, "->", value)`,
  "error-analysis": `errors = [
    {"kind": "blur", "cost": 4},
    {"kind": "new_product", "cost": 9},
    {"kind": "blur", "cost": 2},
    {"kind": "bad_label", "cost": 7},
]

summary = {}
for error in errors:
    bucket = summary.setdefault(error["kind"], {"count": 0, "cost": 0})
    bucket["count"] += 1
    bucket["cost"] += error["cost"]

for kind, values in sorted(summary.items(), key=lambda item: -item[1]["cost"]):
    print(kind, values)`,
  "real-world-case-study": `candidates = [
    {"name": "seasonal_naive", "mae": 12, "latency": 1, "cost": 1},
    {"name": "boosting", "mae": 9, "latency": 8, "cost": 3},
    {"name": "deep_model", "mae": 8, "latency": 90, "cost": 20},
]

feasible = [m for m in candidates if m["latency"] <= 20 and m["cost"] <= 5]
chosen = min(feasible, key=lambda model: model["mae"])
print("chosen:", chosen)
print("rejected:", [m["name"] for m in candidates if m not in feasible])`,
  "debugging-strategies": `def validate_batch(features, labels):
    assert len(features) == len(labels), "row mismatch"
    assert all(len(row) == len(features[0]) for row in features), "schema drift"
    assert set(labels) <= {0, 1}, "invalid label"
    assert all(value == value for row in features for value in row), "NaN found"

tiny_x = [[0.0, 1.0], [1.0, 0.0]]
tiny_y = [0, 1]
validate_batch(tiny_x, tiny_y)
print("invariants pass; next test: can the model overfit these two rows?")`,
  "exercises": `tp, fp, fn = 30, 10, 20
precision = tp / (tp + fp)
recall = tp / (tp + fn)
f1 = 2 * precision * recall / (precision + recall)

print("precision=", round(precision, 3))
print("recall=", round(recall, 3))
print("f1=", round(f1, 3))
print("challenge: lower the threshold and predict which counts move")`,
  "projects": `deliverables = {
    "problem_statement": False,
    "data_sheet": False,
    "baseline": False,
    "evaluation_report": False,
    "error_analysis": False,
    "system_diagram": False,
    "model_card": False,
    "monitoring_plan": False,
}

for name, complete in deliverables.items():
    print("[x]" if complete else "[ ]", name)

print("ready to ship:", all(deliverables.values()))`,
};

export function getTopicCode(slug: string): string | undefined {
  return topicCodeBySlug[slug];
}

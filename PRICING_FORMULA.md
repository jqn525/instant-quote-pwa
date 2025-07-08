# Print Shop Pricing Formula Documentation

Complete pricing formula reference for digital printing operations using HP Indigo press technology.

---

## 1 · Core Formula

**Total job cost**
```
C(Q) = S + Q^e × k + Q × v
```

**Per-unit cost**
```
c(Q) = (Q^e × k + Q × v + S) / Q
```

**Where:**
- **Q** = order quantity (pieces)
- **S** = flat setup fee per job ($30.00)
- **k** = production rate per sheet ($1.50)
- **e** = volume scaling exponent (0.70)
- **v** = variable cost per piece (calculated dynamically)

---

## 2 · Variable Cost Calculation

**Dynamic variable cost formula:**
```
v = (paper + clicks) × 1.5 / imposition
```

**Where:**
- **paper** = cost per sheet (varies by stock type)
- **clicks** = $0.10 (fixed rate for double-sided printing)
- **1.5** = markup factor (50% buffer)
- **imposition** = pieces per sheet (varies by product size)

---

## 3 · Parameter Values and Derivation

### Setup Fee (S = $30.00)
Covers job preparation, file processing, and machine setup:
- File preparation and proofing: ~15 minutes
- Machine setup and calibration: ~10 minutes
- Quality control and first piece approval: ~5 minutes
- **Total labor**: ~30 minutes at loaded rate

### Production Rate (k = $1.50)
Breakdown of production costs per sheet:

| Component | Cost/Sheet | Description |
|-----------|------------|-------------|
| **Machine costs** | $0.70 | Service contract ($2,990/month ÷ 4,300 sheets) |
| **Operator labor** | $0.35 | Loaded rate ($42.25/hr ÷ 120 sheets/hr) |
| **Variable consumables** | $0.10 | Maintenance, replacement parts |
| **Overhead buffer** | $0.35 | Unallocated costs, downtime coverage |
| **Total k** | **$1.50** | **Clean pricing rate** |

### Volume Exponent (e = 0.70)
- **Lower values** (0.65-0.75) = more aggressive volume discounts
- **Higher values** (0.75-0.85) = less volume discount
- **Current 0.70** = strong volume incentive for larger orders

### Material Markup (1.5×)
The 50% markup on materials covers:
- Material waste (8-10%)
- Ordering and receiving labor (10%)
- Inventory storage and handling (10%)
- Machine downtime allocation (10%)
- General buffer for unforeseen costs (10%)

---

## 4 · Product Imposition Values

Common imposition layouts for efficient production:

| Product Size | Imposition | Pieces/Sheet | Efficiency |
|--------------|------------|-------------|------------|
| **4" × 6" postcards** | 8-up | 8 | Highest |
| **5" × 7" postcards** | 4-up | 4 | Medium |
| **6" × 9" postcards** | 2-up | 2 | Lower |
| **8.5" × 11" flyers** | 2-up | 2 | Standard |
| **11" × 17" brochures** | 1-up | 1 | Lowest |

---

## 5 · Worked Examples

### Example 1: 250 postcards (4" × 6")
**Given**: 4" × 6" postcards, 100# Cover paper ($0.28), 8-up imposition

```
v = (0.28 + 0.10) × 1.5 / 8 = $0.071

C(250) = 30 + 250^0.70 × 1.50 + 250 × 0.071
       = 30 + 71.56 × 1.50 + 17.82
       = 30 + 107.34 + 17.82
       = $155.16

Unit cost = $155.16 ÷ 250 = $0.621
```

### Example 2: 100 brochures (8.5" × 11")
**Given**: 8.5" × 11" brochures, 80# Text paper ($0.11), 2-up imposition

```
v = (0.11 + 0.10) × 1.5 / 2 = $0.158

C(100) = 30 + 100^0.70 × 1.50 + 100 × 0.158
       = 30 + 37.68 × 1.50 + 15.80
       = 30 + 56.52 + 15.80
       = $102.32

Unit cost = $102.32 ÷ 100 = $1.023
```

---

## 6 · Finishing Options

**Current structure**: Flat fee per finishing option
```
C_total = C(Q) + (number_of_options × $15.00)
```

**Common finishing options**:
- Folding: $15.00
- Scoring: $15.00  
- UV Coating: $15.00
- Rounded Corners: $15.00
- Perforation: $15.00

**Example with finishing**:
- Base cost (250 postcards): $155.16
- UV coating: $15.00
- **Total with finishing**: $170.16

---

## 7 · Implementation Guidelines

### Adjusting Formula for Your Print Shop

**1. Recalculate k value**:
- Monthly service contract ÷ average monthly sheets
- Loaded labor rate ÷ sheets per hour processed
- Variable consumables cost per sheet
- Add 20-30% overhead buffer

**2. Adjust setup fee (S)**:
- Time for job setup (typically 15-30 minutes)
- Opportunity cost of small jobs  
- Minimum revenue target per job

**3. Modify volume exponent (e)**:
- Higher e (0.75-0.85) = less volume discount
- Lower e (0.65-0.75) = more aggressive volume pricing
- **Current 0.70** = strong volume incentive

**4. Update material markup**:
- Measure actual waste percentage
- Add handling and storage costs
- Include desired operational buffer (30-50%)

### Volume Discount Analysis

At e = 0.70, the production scaling provides:

| Quantity | Production Factor | Per-Unit Production Cost |
|----------|------------------|-------------------------|
| 50 | 15.46 | $0.463 |
| 100 | 25.12 | $0.377 |
| 250 | 47.71 | $0.286 |
| 500 | 78.85 | $0.237 |

---

## 8 · Quick Reference

**Base formula**: `C(Q) = 30 + Q^0.70 × 1.50 + Q × v`

**Variable cost**: `v = (paper + 0.10) × 1.5 / imposition`

**With finishing**: `C_total = C(Q) + (options × 15)`

**Per-unit cost**: `C(Q) ÷ Q`

**Paper costs** (examples):
- 60# Text: $0.085/sheet
- 80# Text: $0.114/sheet  
- 100# Cover: $0.280/sheet
- 130# Cover: $0.538/sheet

---

## 9 · Formula Validation

**Breakeven analysis**: Due to $30 setup fee, breakeven occurs around 20-30 pieces depending on product type.

**Volume benefits**: Significant per-unit cost reduction after 100 pieces due to e=0.70 exponent.

**Minimum order enforcement**: $5.00 minimum protects against micro-jobs.

**Operating data reference**:
- Total annual costs: $62,824
- Average cost per 1,000 impressions: $11.34
- Monthly sheet volume: ~4,300 sheets
- Validation: Formula aligns with actual operating costs

---

*This formula provides transparent, margin-consistent pricing for digital print operations with built-in volume incentives and operational sustainability.*
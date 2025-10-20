# Duty Schedule 📅
_A personal project for automating and managing duty rosters efficiently._

[![Python](https://img.shields.io/badge/Python-3.10%2B-informational)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

---

## 🧩 About the Project
**Duty Schedule** is a self-learning project designed to explore **automation, data structuring, and scheduling algorithms** using Python.  
It helps generate and manage **duty timetables** — such as class duty rotations, work shifts, or responsibility lists — in a structured and reusable format.

This project serves as a practice ground for:
- Managing data through clean modular Python scripts  
- Working with file I/O (CSV/JSON) and date utilities  
- Experimenting with task assignment logic  
- Presenting readable output for users or systems  

> ⚙️ This project is for **personal and educational purposes**, created as part of my continuous learning in Python development.

---

## 🧠 Learning Goals
- Build scheduling logic and automation from scratch  
- Understand fairness algorithms for duty rotations  
- Practice file manipulation, sorting, and time calculations  
- Learn to modularize code for reusability  
- Output clean, human-readable schedules  

---

## 🗂️ Project Structure
```
duty-schedule/
├─ main.py # Main script to generate / manage schedules
├─ schedule.py # Core scheduling logic and data handling
├─ data/
│ ├─ duties.csv # Example input data
│ └─ config.json # Configuration for schedule settings
├─ output/
│ └─ schedule.txt # Generated result (example)
├─ utils/
│ └─ helpers.py # Reusable utility functions (date/time, formatting)
└─ README.md
```

*(Adjust file names if your repo structure differs — the README is designed to stay clean and flexible.)*

---

## 🚀 How to Run

### 1️⃣ Clone the repository
```bash
git clone https://github.com/caffe-ian/duty-schedule.git
cd duty-schedule
```
### 2️⃣ Create a virtual environment (optional)
```bash
python -m venv .venv
source .venv/bin/activate     # macOS/Linux
.venv\S
cripts\activate        # Windows
```
### 3️⃣ Install dependencies (if any)
If you use additional libraries:
```bash
pip install -r requirements.txt
```
Otherwise, the base Python environment is enough.

### 4️⃣ Run the program
```bash
python main.py
```

---

## ⚙️ Configuration
- You can customize scheduling rules by editing `config.json` or the main script:
- Add or remove people from the duty list
- Adjust rotation intervals (daily, weekly, etc.)
- Change start date or skip holidays
- Export generated schedules to `.txt` or `.csv`
Example `config.json`:
```json
{
  "start_date": "2025-01-01",
  "rotation": "weekly",
  "people": ["Alice", "Bob", "Charlie", "David"]
}
```

---

## 📅 Example Output
```nginx
Week 1  →  Alice
Week 2  →  Bob
Week 3  →  Charlie
Week 4  →  David
```
Or exportable to CSV for Google Sheets / Excel integration.

---

## 🧰 Technologies Used
- **Python 3.10+** — core scripting language
- **Datetime / Calendar** — scheduling logic
- **CSV / JSON** — data storage and import/export
- _(Optional)_ **PrettyTable / Rich** — for enhanced console formatting

---

## 💡 Possible Improvements
- Web-based or Discord interface for quick duty lookup
- Integration with Google Calendar API
- Email / message reminders for assigned duties
- Support for uneven workloads or custom weighting

---

## 📄 License
This project is licensed under the **MIT License**.
See [LICENSE](LICENSE) for details.
> You are free to use, modify, and distribute this code for educational or commercial purposes — just include the original license and credit @caffe-ian.

---

## 🙌 Credits
Created by **@caffe-ian**.
Developed as a **personal and educational project** to explore scheduling logic, automation, and Python best practices.

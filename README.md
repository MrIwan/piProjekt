# **piPowerManager**
*Discord-gesteuerter PC-Powerbutton zum Stromsparen*

**Funktion**:
Ein **Raspberry Pi** steuert über **GPIO** den Power-Button eines Tower-PCs.

**Aufbau**:
| Komponente       | Rolle                          |
|------------------|--------------------------------|
| **Raspberry Pi** | Hostet Bot + Watchdog-Skript.  |
| **GPIO-Pin**     | Simuliert Power-Button-Druck.  |
| **Tower-PC**     | Läuft nur bei Bedarf.          |

**Voraussetzungen**:
- GPIO ↔ Mainboard (`PWR_SW`) verdrahten.

# **HyperCircuit**
HyperCircuit je mikrostoritvena aplikacija za prodajo računalniške strojne opreme. Sistem omogoča učinkovito upravljanje izdelkov, naročil, plačil in logistike. Cilj aplikacije je ponujanje skalabilne in zanesljive storitve.

## **Arhitektura**
Aplikacija je sestavljena iz treh mikrostoritev in enega frontenda:
### **Mikrostoritve**
1. Product Service - upravljanje izdelkov in zalog
* iskanje, dodajanje, urejanje in brisanje izdelkov
* filtriranje izdelkov po ceni in kategoriji
2. User Service - upravljanje uporabnikov in avtentikacija
* registracija in prijava uporabnikov
* avtentikacija uporabnikov z JWT
3. Cart Service - košarica in proces nakupa
* Dodajanje in odstranjevanje izdelkov iz košarice
* Stranjevanje stanja košarice za registrirane in anonimne uporabnike

### **Frontend**
Vue aplikacija - Uporabniški vmesnik, ki omogoča interakcijo z mikrostoritvami
  * Brskanje po izdelkih in filtriranje
  * Prijava in registracija uporabnikov
  * Upravljanje zaloge in košarice

## Struktura projekta
```plaintext
HyperCircuit/
│── services/
│   ├── product/
│   ├── order/
│   ├── user/
│   ├── cart/
│   ├── payment/
│── frontend/ (Vue aplikacija)
│── docs/ (dokumentacija, diagrami)
│── README.md
│── docker-compose.yml
```

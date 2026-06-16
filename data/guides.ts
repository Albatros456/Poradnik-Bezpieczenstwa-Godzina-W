import type { Guide } from "../types/guide";

export const guides: Guide[] = [
  {
    id: "plecak-ewakuacyjny",
    title: "Jak przygotować plecak ewakuacyjny",
    category: "Plecak ewakuacyjny",
    description:
      "Lista podstawowych rzeczy, które warto mieć przygotowane na wypadek nagłej ewakuacji.",
    content:
      "Przygotuj dokumenty, wodę, jedzenie o długim terminie ważności, latarkę, powerbank, apteczkę, podstawowe ubrania i gotówkę. Plecak powinien być gotowy do szybkiego zabrania.",
    keywords: ["plecak", "ewakuacja", "dokumenty", "woda", "jedzenie"],
  },
  {
    id: "brak-pradu",
    title: "Co zrobić przy braku prądu",
    category: "Brak prądu",
    description: "Podstawowe zasady bezpieczeństwa podczas awarii zasilania.",
    content:
      "Sprawdź latarki i baterie, oszczędzaj energię w telefonie, odłącz wrażliwe urządzenia od gniazdek i używaj świec tylko pod stałym nadzorem.",
    keywords: ["prąd", "awaria", "latarka", "powerbank", "bezpieczeństwo"],
  },
  {
    id: "krwotok",
    title: "Pierwsza pomoc przy krwotoku",
    category: "Pierwsza pomoc",
    description: "Instrukcja postępowania przy silnym krwawieniu.",
    content:
      "Załóż rękawiczki, jeśli są dostępne. Uciśnij ranę czystym opatrunkiem, unieś zranioną kończynę, jeśli to możliwe, i wezwij pomoc pod numerem 112.",
    keywords: ["rana", "krew", "krwotok", "opatrunek", "ucisk"],
  },
  {
    id: "ewakuacja",
    title: "Jak zachować się podczas ewakuacji",
    category: "Ewakuacja",
    description:
      "Najważniejsze zasady bezpiecznego opuszczania zagrożonego miejsca.",
    content:
      "Zachowaj spokój, zabierz najważniejsze dokumenty i leki, pomagaj osobom słabszym, idź wyznaczoną drogą ewakuacji i nie wracaj po rzeczy.",
    keywords: ["ewakuacja", "wyjście", "bezpieczeństwo", "dokumenty"],
  },
  {
    id: "woda",
    title: "Jak zabezpieczyć wodę do picia",
    category: "Brak wody",
    description: "Podstawowe sposoby przechowywania i oszczędzania wody.",
    content:
      "Przechowuj wodę w czystych pojemnikach, trzymaj zapas dla każdej osoby, ogranicz zużycie do najważniejszych potrzeb i dbaj o higienę rąk.",
    keywords: ["woda", "picie", "zapasy", "higiena"],
  },
  {
    id: "burza",
    title: "Bezpieczeństwo podczas burzy",
    category: "Zagrożenia naturalne",
    description: "Zasady zachowania podczas burzy i silnego wiatru.",
    content:
      "Wejdź do budynku, unikaj drzew i metalowych konstrukcji, odłącz urządzenia elektryczne i nie przebywaj na otwartej przestrzeni.",
    keywords: ["burza", "piorun", "wiatr", "schronienie"],
  },
  {
    id: "dom-kryzys",
    title: "Jak przygotować dom na sytuację kryzysową",
    category: "Bezpieczeństwo w domu",
    description:
      "Podstawowe działania zwiększające bezpieczeństwo domowników.",
    content:
      "Przygotuj zapas wody i jedzenia, apteczkę, latarki, baterie, listę ważnych kontaktów oraz ustal z rodziną miejsce spotkania.",
    keywords: ["dom", "zapasy", "bezpieczeństwo", "apteczka"],
  },
  {
    id: "survival",
    title: "Podstawowe zasady survivalu",
    category: "Survival",
    description: "Najważniejsze zasady przetrwania w trudnych warunkach.",
    content:
      "Najpierw zadbaj o bezpieczeństwo, schronienie i wodę. Oceniaj sytuację spokojnie, sygnalizuj swoją obecność i oszczędzaj siły.",
    keywords: ["survival", "przetrwanie", "woda", "schronienie", "ogień"],
  },
  {
    id: "komunikacja",
    title: "Jak komunikować się w sytuacji kryzysowej",
    category: "Komunikacja kryzysowa",
    description:
      "Zasady przekazywania informacji i kontaktu z bliskimi podczas zagrożenia.",
    content:
      "Ustal krótkie komunikaty, oszczędzaj baterię, korzystaj z SMS, gdy sieć jest przeciążona, i wcześniej ustal rodzinny punkt kontaktowy.",
    keywords: ["telefon", "kontakt", "rodzina", "komunikacja", "kryzys"],
  },
  {
    id: "alarm-powietrzny",
    title: "Co zrobić przy alarmie powietrznym",
    category: "Zagrożenia militarne",
    description: "Podstawowe zasady zachowania po usłyszeniu alarmu.",
    content:
      "Przejdź do najbliższego schronienia lub bezpiecznego miejsca, oddal się od okien, słuchaj komunikatów służb i zabierz podstawowe rzeczy.",
    keywords: ["alarm", "schron", "zagrożenie", "bezpieczeństwo"],
  },
  {
    id: "jak-wezwac-pomoc",
    title: "Jak wezwać pomoc",
    category: "Numery alarmowe",
    description: "Jak prawidłowo zgłosić zagrożenie przez telefon alarmowy.",
    content:
      "Dzwoń z bezpiecznego miejsca. Mów spokojnie i wyraźnie. Podaj dokładny adres, a jeśli go nie znasz, opisz charakterystyczne miejsca w okolicy. Wyjaśnij, co się stało i czy zagrożone jest życie, zdrowie lub mienie. Nie rozłączaj się pierwszy, poczekaj aż operator potwierdzi przyjęcie zgłoszenia.",
    keywords: ["112", "pomoc", "alarm", "operator", "adres"],
  },
  {
    id: "najwazniejsze-numery-alarmowe",
    title: "Najważniejsze numery alarmowe",
    category: "Numery alarmowe",
    description: "Lista podstawowych numerów przydatnych w sytuacji zagrożenia.",
    content:
      "Numer 112 służy do zgłaszania nagłych zagrożeń życia, zdrowia lub mienia. Warto znać też numery do pogotowia ratunkowego, straży pożarnej, policji, pogotowia gazowego, energetycznego i wodno-kanalizacyjnego. Numery alarmowe najlepiej mieć zapisane w telefonie oraz na kartce w domu.",
    keywords: ["112", "999", "998", "997", "alarmowe"],
  },
  {
    id: "przygotowanie-siebie-i-bliskich",
    title: "Przygotowanie siebie i bliskich",
    category: "Przygotowanie",
    description: "Podstawowe działania zwiększające bezpieczeństwo rodziny.",
    content:
      "Dbaj o zdrowie, sen, jedzenie i aktywność fizyczną. Miej przy sobie leki, dokumentację medyczną i informacje o alergiach. Utrzymuj kontakt z osobami, na których możesz polegać. Omów z rodziną, co robić w przypadku kryzysu.",
    keywords: ["rodzina", "zdrowie", "leki", "plan", "kryzys"],
  },
  {
    id: "zdrowie-psychiczne-w-kryzysie",
    title: "Zdrowie psychiczne w kryzysie",
    category: "Przygotowanie",
    description: "Jak zadbać o spokój i odporność psychiczną podczas zagrożenia.",
    content:
      "Nie śledź chaotycznie wszystkich informacji. Korzystaj z wiarygodnych źródeł. Rozmawiaj z bliskimi i nie izoluj się. Jeśli czujesz silny lęk lub przeciążenie, skorzystaj z pomocy psychologicznej albo telefonu wsparcia.",
    keywords: ["psychika", "stres", "lęk", "wsparcie", "informacje"],
  },
  {
    id: "leki-i-dokumentacja-medyczna",
    title: "Przygotowanie leków i dokumentacji medycznej",
    category: "Zdrowie",
    description: "Co przygotować, jeśli ktoś stale przyjmuje leki.",
    content:
      "Zapisz nazwy leków, dawki, choroby przewlekłe i alergie. Trzymaj dokumentację medyczną w jednym miejscu. Przygotuj zapas leków na kilka dni. Poinformuj bliskich, gdzie znajdują się najważniejsze dokumenty.",
    keywords: ["leki", "dokumenty", "alergie", "choroby", "zdrowie"],
  },
  {
    id: "pomoc-osobom-starszym-i-chorym",
    title: "Pomoc osobom starszym i chorym",
    category: "Pomoc innym",
    description: "Jak wspierać osoby, które mogą mieć trudność z samodzielnym reagowaniem.",
    content:
      "Ustal z osobą potrzebującą pomocy plan działania. Pomóż jej przygotować leki, baterie do urządzeń medycznych, dokumenty i plecak ewakuacyjny. W razie ewakuacji poinformuj służby, że dana osoba wymaga szczególnej pomocy.",
    keywords: ["senior", "choroba", "pomoc", "leki", "ewakuacja"],
  },
  {
    id: "rozmowa-z-dziecmi-o-zagrozeniach",
    title: "Rozmowa z dziećmi o zagrożeniach",
    category: "Rodzina",
    description: "Jak spokojnie wyjaśniać dzieciom sytuacje kryzysowe.",
    content:
      "Rozmawiaj spokojnie i dostosuj język do wieku dziecka. Nie strasz, ale odpowiadaj szczerze. Wyjaśnij dziecku, co ma robić w razie alarmu lub ewakuacji. Przećwiczcie razem proste zadania.",
    keywords: ["dzieci", "rodzina", "rozmowa", "alarm", "ewakuacja"],
  },
  {
    id: "przygotowanie-zwierzat-domowych",
    title: "Przygotowanie zwierząt domowych",
    category: "Zwierzęta",
    description: "Co zrobić, aby zwierzę było bezpieczne podczas kryzysu.",
    content:
      "Przygotuj zapas karmy, wody i leków. Trzymaj dokumentację zdrowotną zwierzęcia w jednym miejscu. Przygotuj transporter, smycz, szelki lub kaganiec. Zadbaj o chip i dane kontaktowe przy obroży.",
    keywords: ["zwierzęta", "karma", "transporter", "chip", "woda"],
  },
  {
    id: "przygotowanie-zwierzat-gospodarskich",
    title: "Przygotowanie zwierząt gospodarskich",
    category: "Zwierzęta",
    description: "Jak zabezpieczyć zwierzęta gospodarskie.",
    content:
      "Przygotuj zapas paszy i wody. Sprawdź stan budynków gospodarskich oraz ogrodzeń. Oznakuj zwierzęta. Jeżeli ewakuacja nie będzie możliwa, poinformuj służby o pozostawionych zwierzętach.",
    keywords: ["zwierzęta", "gospodarstwo", "pasza", "woda", "ewakuacja"],
  },
  {
    id: "przygotowanie-samochodu",
    title: "Przygotowanie samochodu",
    category: "Transport",
    description: "Co powinno znajdować się w aucie na wypadek kryzysu.",
    content:
      "Samochód powinien być sprawny technicznie i zatankowany. W aucie warto mieć apteczkę, gaśnicę, trójkąt ostrzegawczy, koło zapasowe lub zestaw naprawczy. Przydatna jest też papierowa mapa, ponieważ GPS może nie działać.",
    keywords: ["samochód", "transport", "apteczka", "gaśnica", "mapa"],
  },
  {
    id: "alternatywna-lacznosc",
    title: "Alternatywna łączność",
    category: "Łączność",
    description: "Jak utrzymać kontakt, gdy telefon lub internet przestanie działać.",
    content:
      "Przygotuj radio na baterie lub na korbkę. Rozważ krótkofalówki, CB radio albo walkie-talkie. Miej zapasowe baterie i powerbank. W kryzysie ogranicz rozmowy telefoniczne i korzystaj z SMS-ów.",
    keywords: ["łączność", "radio", "SMS", "powerbank", "baterie"],
  },
  {
    id: "przygotowanie-domu-lub-mieszkania",
    title: "Przygotowanie domu lub mieszkania",
    category: "Dom",
    description: "Jak przygotować mieszkanie na brak prądu, wody, gazu lub internetu.",
    content:
      "Przygotuj rzeczy do uszczelniania okien i drzwi, np. taśmy, ręczniki i koce. Usuń niepotrzebne przedmioty z korytarzy i klatek schodowych. Sprawdź, gdzie w domu jest najbezpieczniejsze miejsce, najlepiej z dala od okien.",
    keywords: ["dom", "mieszkanie", "okna", "drzwi", "bezpieczeństwo"],
  },
  {
    id: "bezpieczne-miejsce-w-domu",
    title: "Bezpieczne miejsce w domu",
    category: "Dom",
    description: "Jak wybrać miejsce schronienia w mieszkaniu.",
    content:
      "Najbezpieczniejsze są pomieszczenia z dala od okien, przy ścianach nośnych i w centralnej części budynku. Unikaj balkonów, dużych przeszkleń i miejsc przy elewacji. Warto wcześniej ustalić z rodziną, gdzie wszyscy mają się zebrać.",
    keywords: ["dom", "schronienie", "okna", "rodzina", "bezpieczeństwo"],
  },
  {
    id: "odciecie-gazu-pradu-i-wody",
    title: "Odcięcie gazu, prądu i wody",
    category: "Dom",
    description: "Co warto wiedzieć o instalacjach domowych.",
    content:
      "Sprawdź, gdzie znajdują się zawory gazu, wody i główny wyłącznik prądu. Oznacz je w widoczny sposób. Przećwicz z domownikami ich wyłączanie. Regularnie wykonuj przeglądy instalacji.",
    keywords: ["gaz", "prąd", "woda", "zawory", "instalacje"],
  },
  {
    id: "czujniki-bezpieczenstwa-w-domu",
    title: "Czujniki bezpieczeństwa w domu",
    category: "Dom",
    description: "Jakie urządzenia zwiększają bezpieczeństwo domowników.",
    content:
      "Zamontuj czujnik dymu, czadu i gazu. Regularnie sprawdzaj baterie i stan techniczny czujników. W domu warto mieć również gaśnicę i koc gaśniczy.",
    keywords: ["czujnik", "dym", "czad", "gaz", "gaśnica"],
  },
  {
    id: "bezpieczenstwo-w-szkole",
    title: "Bezpieczeństwo w szkole",
    category: "Szkoła",
    description: "Co zrobić, aby dziecko było przygotowane na sytuację awaryjną w szkole.",
    content:
      "Dziecko powinno brać udział w próbnych alarmach. Rodzic powinien znać procedurę odbioru dziecka w sytuacji zagrożenia. Warto zapisać kontakt do osoby wyznaczonej przez szkołę.",
    keywords: ["szkoła", "dziecko", "alarm", "rodzic", "procedury"],
  },
  {
    id: "bezpieczenstwo-w-pracy",
    title: "Bezpieczeństwo w pracy",
    category: "Praca",
    description: "Jak przygotować się na sytuacje awaryjne w miejscu pracy.",
    content:
      "Sprawdź lokalizację wyjść ewakuacyjnych, apteczek, defibrylatorów AED, gaśnic i miejsca zbiórki. Zgłaszaj uszkodzone instalacje, zablokowane przejścia i inne nieprawidłowości. Przećwicz plan ewakuacji ze współpracownikami.",
    keywords: ["praca", "ewakuacja", "apteczka", "AED", "gaśnica"],
  },
  {
    id: "zapasy-domowe-na-3-dni",
    title: "Zapasy domowe na minimum 3 dni",
    category: "Zapasy",
    description: "Co powinno znaleźć się w domu na wypadek odcięcia od prądu, wody lub sklepów.",
    content:
      "Przygotuj minimum 3 litry wody na osobę na dobę. Zgromadź żywność gotową do spożycia, leki, środki higieniczne, latarki, radio, baterie, powerbank, gotówkę, koce i podstawowe narzędzia. Regularnie sprawdzaj terminy ważności.",
    keywords: ["zapasy", "woda", "żywność", "latarka", "gotówka"],
  },
  {
    id: "zapasy-wody-i-zywnosci",
    title: "Zapasy wody i żywności",
    category: "Zapasy",
    description: "Jak przygotować jedzenie i picie na pierwsze dni kryzysu.",
    content:
      "Przechowuj wodę butelkowaną oraz produkty z długim terminem ważności. Wybieraj jedzenie, które nie wymaga gotowania, np. konserwy, suchary, batony energetyczne, suszone owoce i bakalie. Zapasy regularnie wymieniaj.",
    keywords: ["woda", "żywność", "konserwy", "zapasy", "jedzenie"],
  },
  {
    id: "domowa-apteczka",
    title: "Domowa apteczka",
    category: "Zdrowie",
    description: "Co powinno znaleźć się w apteczce kryzysowej.",
    content:
      "W apteczce trzymaj leki przyjmowane stale, środki przeciwbólowe, przeciwzapalne, przeciwwymiotne i przeciwbiegunkowe. Dodaj gazę, bandaże, opatrunki, rękawiczki, środki antyseptyczne, maseczki FFP3, folię termiczną, termometr i nożyczki.",
    keywords: ["apteczka", "leki", "opatrunki", "rękawiczki", "termometr"],
  },
  {
    id: "higiena-i-srodki-czystosci",
    title: "Higiena i środki czystości",
    category: "Zapasy",
    description: "Co przygotować, gdy zabraknie bieżącej wody.",
    content:
      "Przygotuj papier toaletowy, chusteczki nawilżane, środki dezynfekujące, podpaski, pieluchy, worki na śmieci i wiadro z pokrywą. W kryzysie higiena pomaga ograniczyć choroby i zakażenia.",
    keywords: ["higiena", "woda", "dezynfekcja", "odpady", "zapasy"],
  },
  {
    id: "oswietlenie-i-energia-awaryjna",
    title: "Oświetlenie i energia awaryjna",
    category: "Blackout",
    description: "Jak przygotować się na brak prądu.",
    content:
      "Miej latarkę, radio na baterie lub korbkę, zapas baterii, powerbank, kable i ładowarki. Świeczki stosuj ostrożnie i tylko w bezpiecznych warunkach. Rozważ alternatywne źródło ogrzewania niewymagające prądu.",
    keywords: ["blackout", "latarka", "baterie", "powerbank", "energia"],
  },
  {
    id: "gotowka-w-kryzysie",
    title: "Gotówka w kryzysie",
    category: "Zapasy",
    description: "Dlaczego warto mieć pieniądze w gotówce.",
    content:
      "Podczas awarii prądu, internetu lub terminali płatniczych płatność kartą może być niemożliwa. Przygotuj gotówkę w różnych nominałach. Trzymaj ją w bezpiecznym miejscu, ale tak, aby była łatwo dostępna w razie ewakuacji.",
    keywords: ["gotówka", "płatności", "awaria", "ewakuacja", "zapasy"],
  },
  {
    id: "sygnaly-alarmowe",
    title: "Sygnały alarmowe",
    category: "Alarmy",
    description: "Jak rozpoznać podstawowe sygnały alarmowe w Polsce.",
    content:
      "Ogłoszenie alarmu to ciągły, modulowany dźwięk syreny trwający 3 minuty. Odwołanie alarmu to ciągły, jednostajny dźwięk syreny trwający 3 minuty. Po usłyszeniu syreny włącz radio, telewizję lub sprawdź oficjalne komunikaty.",
    keywords: ["alarm", "syrena", "komunikat", "radio", "ostrzeżenie"],
  },
  {
    id: "komunikaty-ostrzegawcze",
    title: "Komunikaty ostrzegawcze",
    category: "Alarmy",
    description: "Skąd służby przekazują informacje o zagrożeniach.",
    content:
      "Informacje mogą być przekazywane przez syreny, megafony, radio, telewizję, internet, Alerty RCB, Regionalny System Ostrzegania i bezpośredni kontakt ze służbami. Korzystaj z wiarygodnych źródeł i nie rozpowszechniaj plotek.",
    keywords: ["komunikaty", "RCB", "RSO", "radio", "ostrzeżenia"],
  },
  {
    id: "ewakuacja-szybka",
    title: "Ewakuacja",
    category: "Ewakuacja",
    description: "Co zrobić, gdy trzeba szybko opuścić miejsce zagrożenia.",
    content:
      "Zamknij okna, odetnij wodę, gaz i prąd, jeśli możesz zrobić to bezpiecznie. Ubierz się odpowiednio do pogody. Zabierz plecak ewakuacyjny. Powiadom bliskich, dokąd się udajesz. Pomóż osobom potrzebującym wsparcia i nie blokuj dróg ewakuacyjnych.",
    keywords: ["ewakuacja", "plecak", "gaz", "prąd", "bliscy"],
  },
  {
    id: "bezpieczna-ewakuacja-samochodem",
    title: "Bezpieczna ewakuacja samochodem",
    category: "Ewakuacja",
    description: "Jak zachować się, jeśli ewakuujesz się autem.",
    content:
      "Nie blokuj dróg ewakuacyjnych. Ustal trasę wcześniej, ale licz się z objazdami. Zabierz papierową mapę. Przekaż bliskim numer rejestracyjny pojazdu, którym podróżujesz, oraz aktualną lokalizację.",
    keywords: ["ewakuacja", "samochód", "trasa", "mapa", "lokalizacja"],
  },
  {
    id: "plecak-ewakuacyjny-pelny",
    title: "Plecak ewakuacyjny",
    category: "Ewakuacja",
    description: "Najważniejszy zestaw rzeczy do szybkiego opuszczenia domu.",
    content:
      "W plecaku powinny znaleźć się woda, apteczka, leki, dokumenty, gotówka, latarka, radio, powerbank, ładowarka, baterie, ubranie przeciwdeszczowe, śpiwór, folia termiczna, żywność gotowa do spożycia, multitool, zapalniczka, worki i mapa papierowa.",
    keywords: ["plecak", "ewakuacja", "apteczka", "dokumenty", "latarka"],
  },
  {
    id: "plecak-ewakuacyjny-dla-dziecka",
    title: "Plecak ewakuacyjny dla dziecka",
    category: "Ewakuacja",
    description: "Jak dopasować plecak do możliwości dziecka.",
    content:
      "Plecak dziecka powinien być lekki. Warto umieścić w nim wodę, przekąskę, małą latarkę, dane kontaktowe opiekunów, kopię dokumentu, leki, jeśli są potrzebne, oraz mały przedmiot dający poczucie bezpieczeństwa.",
    keywords: ["dziecko", "plecak", "ewakuacja", "woda", "kontakt"],
  },
  {
    id: "bezpieczenstwo-w-tlumie",
    title: "Bezpieczeństwo w tłumie",
    category: "Zagrożenia publiczne",
    description: "Jak zachować się podczas paniki na koncercie, meczu lub zgromadzeniu.",
    content:
      "Przed wydarzeniem sprawdź wyjścia ewakuacyjne. W razie paniki poruszaj się z tłumem i unikaj gwałtownych ruchów. Nie schylaj się po przedmioty. Jeśli upadniesz, postaraj się szybko wstać, a gdy to niemożliwe, skul się i osłoń głowę.",
    keywords: ["tłum", "panika", "ewakuacja", "zgromadzenie", "bezpieczeństwo"],
  },
  {
    id: "zaginiecie-bliskiego-w-tlumie",
    title: "Co zrobić, gdy zaginie bliski w tłumie",
    category: "Zagrożenia publiczne",
    description: "Jak reagować, gdy stracisz kontakt z bliską osobą.",
    content:
      "Skontaktuj się z ochroną wydarzenia lub policją. Przygotuj dokładny opis osoby, jej ubrania i ostatniego miejsca, w którym była widziana. Warto wcześniej ustalić z bliskimi punkt spotkania na wypadek rozdzielenia.",
    keywords: ["tłum", "zagubienie", "ochrona", "policja", "punkt spotkania"],
  },
  {
    id: "schronienie",
    title: "Schronienie",
    category: "Schronienie",
    description: "Gdzie szukać ochrony w sytuacji zagrożenia.",
    content:
      "Informacji o miejscach schronienia szukaj w urzędzie gminy, straży pożarnej lub na oficjalnych stronach. Jeśli nie możesz dotrzeć do schronienia, zostań w domu z dala od okien, najlepiej przy ścianach nośnych i w centralnym pomieszczeniu.",
    keywords: ["schronienie", "schron", "gmina", "straż", "okna"],
  },
  {
    id: "schronienie-poza-domem",
    title: "Schronienie poza domem",
    category: "Schronienie",
    description: "Co zrobić, gdy zagrożenie zastanie Cię na zewnątrz.",
    content:
      "Szukaj najniższych kondygnacji budynków, piwnic, garaży podziemnych, tuneli lub przejść podziemnych. Unikaj otwartej przestrzeni. Nawet zagłębienie terenu daje większą ochronę niż stanie na odkrytym miejscu.",
    keywords: ["schronienie", "piwnica", "tunel", "garaż", "teren"],
  },
  {
    id: "pozar-w-domu",
    title: "Pożar w domu",
    category: "Pożar",
    description: "Jak reagować po zauważeniu ognia lub dymu.",
    content:
      "Zadzwoń pod 112. Jeśli ogień jest mały i możesz działać bezpiecznie, spróbuj go ugasić. Zakręć gaz i wyłącz prąd, jeśli nie naraża Cię to na niebezpieczeństwo. Nie otwieraj okien i drzwi bez potrzeby, bo dostęp powietrza może nasilić pożar.",
    keywords: ["pożar", "ogień", "dym", "112", "gaz"],
  },
  {
    id: "czego-nie-gasic-woda",
    title: "Czego nie gasić wodą",
    category: "Pożar",
    description: "Kiedy woda może pogorszyć sytuację.",
    content:
      "Nie gaś wodą urządzeń elektrycznych, tłuszczu ani oleju. Palący się olej na patelni najlepiej przykryć pokrywką, kocem gaśniczym albo mokrą ścierką. Przy pożarze gazu odetnij dopływ gazu, jeśli możesz zrobić to bezpiecznie.",
    keywords: ["pożar", "woda", "olej", "prąd", "gaz"],
  },
  {
    id: "ucieczka-z-zadymionego-budynku",
    title: "Ucieczka z zadymionego budynku",
    category: "Pożar",
    description: "Jak bezpiecznie opuścić budynek podczas pożaru.",
    content:
      "Nie używaj windy. Korzystaj ze schodów. Osłoń nos i usta, najlepiej mokrym materiałem. Poruszaj się nisko, bo dym unosi się ku górze. Poinformuj służby, jeśli ktoś został w budynku.",
    keywords: ["pożar", "dym", "schody", "winda", "ewakuacja"],
  },
  {
    id: "powodz",
    title: "Powódź",
    category: "Powódź",
    description: "Jak przygotować się na zalanie terenu.",
    content:
      "Przygotuj plecak ewakuacyjny. Zabezpiecz dom workami z piaskiem i uszczelnij drzwi oraz okna. Przenieś cenne rzeczy i urządzenia elektryczne na wyższe piętra. Wyłącz instalację elektryczną i gazową. Nie ignoruj wezwań do ewakuacji.",
    keywords: ["powódź", "woda", "ewakuacja", "piasek", "dom"],
  },
  {
    id: "flagi-sygnalowe-podczas-powodzi",
    title: "Flagi sygnałowe podczas powodzi",
    category: "Powódź",
    description: "Jak poinformować ratowników o potrzebach, gdy ewakuacja nie jest możliwa.",
    content:
      "Jeśli nie możesz się ewakuować, wywieś flagę w widocznym miejscu. Biała oznacza potrzebę ewakuacji, czerwona potrzebę pomocy medycznej, a niebieska potrzebę żywności i wody. Flagę można zrobić z ubrania lub materiału.",
    keywords: ["powódź", "flaga", "ewakuacja", "ratownicy", "pomoc"],
  },
  {
    id: "blackout",
    title: "Blackout",
    category: "Blackout",
    description: "Jak przygotować się na długotrwały brak prądu.",
    content:
      "Przygotuj latarki, radio, baterie, powerbanki, gotówkę, zapas wody i żywności. Naładuj telefon i włącz tryb oszczędzania energii. Zadbaj o alternatywne źródło światła, ciepła i łączności.",
    keywords: ["blackout", "prąd", "latarka", "radio", "powerbank"],
  },
  {
    id: "co-robic-podczas-braku-pradu",
    title: "Co robić podczas braku prądu",
    category: "Blackout",
    description: "Jak ograniczyć skutki awarii prądu.",
    content:
      "Oszczędzaj ciepło i zbierz domowników w jednym pokoju. Nie otwieraj często lodówki ani zamrażarki. Odłącz urządzenia elektryczne od zasilania, aby uniknąć uszkodzeń po powrocie prądu.",
    keywords: ["blackout", "prąd", "lodówka", "ciepło", "urządzenia"],
  },
  {
    id: "atak-z-powietrza",
    title: "Atak z powietrza",
    category: "Zagrożenia wojenne",
    description: "Jak reagować po sygnale alarmowym lub eksplozji.",
    content:
      "Udaj się do wcześniej ustalonego miejsca schronienia. Zabierz plecak ewakuacyjny. Nie używaj windy. Jeśli jesteś na otwartej przestrzeni i słyszysz eksplozję, padnij na ziemię, najlepiej w zagłębieniu, i osłoń głowę.",
    keywords: ["atak", "alarm", "schronienie", "eksplozja", "ewakuacja"],
  },
  {
    id: "zachowanie-w-schronieniu",
    title: "Zachowanie w schronieniu",
    category: "Zagrożenia wojenne",
    description: "Co robić po dotarciu do bezpiecznego miejsca.",
    content:
      "Nie wychodź pochopnie. Czekaj na komunikaty służb. Nie przeciążaj sieci telefonicznej, korzystaj z SMS-ów. Sprawdź, czy ktoś w pobliżu nie potrzebuje pomocy.",
    keywords: ["schronienie", "SMS", "służby", "pomoc", "alarm"],
  },
  {
    id: "zagrozenia-cbrn",
    title: "Zagrożenia chemiczne, biologiczne, radiacyjne i nuklearne",
    category: "CBRN",
    description: "Jak reagować po komunikacie o skażeniu.",
    content:
      "Opuść zagrożony obszar, jeśli możesz. Jeśli zostajesz w budynku, zamknij i uszczelnij okna, drzwi oraz wentylację. Wyłącz klimatyzację. Po powrocie z zewnątrz zdejmij skażone ubranie, umyj ręce, twarz i ciało.",
    keywords: ["CBRN", "skażenie", "chemiczne", "radiacyjne", "wentylacja"],
  },
  {
    id: "skazone-przedmioty-i-ubrania",
    title: "Skażone przedmioty i ubrania",
    category: "CBRN",
    description: "Co zrobić z rzeczami, które mogły mieć kontakt ze skażeniem.",
    content:
      "Przedmioty, ubrania lub żywność, które mogły zostać skażone, włóż do plastikowych worków. Szczelnie je zamknij i oznacz. Nie dotykaj twarzy przed umyciem rąk. Nie jedz produktów, które mogły zostać skażone.",
    keywords: ["CBRN", "skażenie", "ubrania", "worki", "żywność"],
  },
  {
    id: "niepokojace-zachowania",
    title: "Niepokojące zachowania",
    category: "Bezpieczeństwo publiczne",
    description: "Na jakie sytuacje zwracać uwagę w otoczeniu.",
    content:
      "Zwracaj uwagę na osoby fotografujące lub filmujące ważne obiekty, nietypowe oznaczenia na infrastrukturze, próby zdobywania danych osobowych albo planów budynków. Podejrzane sytuacje zgłaszaj służbom.",
    keywords: ["bezpieczeństwo", "służby", "obiekty", "infrastruktura", "zgłoszenie"],
  },
  {
    id: "podejrzane-oznaczenia",
    title: "Podejrzane oznaczenia",
    category: "Bezpieczeństwo publiczne",
    description: "Co zrobić, jeśli zauważysz dziwne symbole lub znaki.",
    content:
      "Nietypowe znaki farbą, kredą, taśmą lub graffiti w pobliżu infrastruktury mogą wymagać zgłoszenia. Nie usuwaj ich samodzielnie, jeśli sytuacja wygląda podejrzanie. Zrób notatkę o lokalizacji i powiadom odpowiednie służby.",
    keywords: ["oznaczenia", "infrastruktura", "służby", "lokalizacja", "zgłoszenie"],
  },
  {
    id: "zagrozenie-terrorystyczne",
    title: "Zagrożenie terrorystyczne",
    category: "Terroryzm",
    description: "Jak reagować, gdy jesteś świadkiem ataku.",
    content:
      "Nie podchodź do miejsca zdarzenia. Uciekaj, ostrzegaj innych i zawiadom służby. Nie zakładaj, że ktoś inny już zadzwonił. Nie wracaj na miejsce zdarzenia.",
    keywords: ["terroryzm", "atak", "ucieczka", "służby", "zagrożenie"],
  },
  {
    id: "ukrycie-podczas-ataku",
    title: "Ukrycie podczas ataku",
    category: "Terroryzm",
    description: "Co zrobić, jeśli nie możesz uciec.",
    content:
      "Ukryj się z dala od tłumu. Znajdź osłonę, np. grube ściany lub solidną konstrukcję. W pomieszczeniu zabarykaduj drzwi, zasłoń okna, wyłącz światło i wycisz telefon.",
    keywords: ["terroryzm", "ukrycie", "atak", "telefon", "osłona"],
  },
  {
    id: "czego-nie-robic-podczas-ataku",
    title: "Czego nie robić podczas ataku",
    category: "Terroryzm",
    description: "Jak nie zwiększać zagrożenia dla innych.",
    content:
      "Nie dzwoń bez potrzeby, aby nie blokować sieci. Nie dzwoń do osób ukrywających się, bo dźwięk telefonu może zdradzić ich położenie. Nie publikuj zdjęć ani filmów z miejsca zdarzenia. Nie rozpowszechniaj niesprawdzonych informacji.",
    keywords: ["terroryzm", "telefon", "informacje", "atak", "sieć"],
  },
  {
    id: "dezinformacja",
    title: "Dezinformacja",
    category: "Zagrożenia cyfrowe",
    description: "Jak rozpoznać i ograniczać wpływ fałszywych informacji.",
    content:
      "Sprawdzaj informacje w kilku niezależnych źródłach. Nie udostępniaj treści, których nie możesz potwierdzić. Korzystaj z oficjalnych komunikatów państwowych i służb. Nie podawaj dalej informacji o ruchach wojska ani ważnych obiektach.",
    keywords: ["dezinformacja", "informacje", "źródła", "komunikaty", "internet"],
  },
  {
    id: "cyberprzestepczosc",
    title: "Cyberprzestępczość",
    category: "Zagrożenia cyfrowe",
    description: "Jak chronić dane i konta przed oszustami.",
    content:
      "Nie klikaj pochopnie linków i załączników. Sprawdzaj adres nadawcy i treść wiadomości. Chroń dane logowania i dane kart płatniczych. Używaj silnych haseł, menedżera haseł i weryfikacji dwuetapowej.",
    keywords: ["cyberbezpieczeństwo", "hasła", "linki", "dane", "oszustwo"],
  },
  {
    id: "bezpieczne-aplikacje-i-oprogramowanie",
    title: "Bezpieczne aplikacje i oprogramowanie",
    category: "Zagrożenia cyfrowe",
    description: "Jak ograniczyć ryzyko infekcji urządzenia.",
    content:
      "Aktualizuj system, aplikacje i program antywirusowy. Korzystaj tylko z legalnego oprogramowania. Nie instaluj aplikacji z niesprawdzonych źródeł. Regularnie rób kopie zapasowe ważnych plików.",
    keywords: ["aplikacje", "aktualizacje", "antywirus", "kopie", "oprogramowanie"],
  },
  {
    id: "publiczne-wifi",
    title: "Publiczne Wi-Fi",
    category: "Zagrożenia cyfrowe",
    description: "Jak bezpiecznie korzystać z internetu poza domem.",
    content:
      "Zachowaj ostrożność w publicznych sieciach Wi-Fi. Nie loguj się do banku ani ważnych usług, jeśli nie masz pewności, że połączenie jest bezpieczne. Unikaj podawania danych logowania w podejrzanych sieciach.",
    keywords: ["wifi", "internet", "bank", "logowanie", "dane"],
  },
  {
    id: "zglaszanie-cyberoszustw",
    title: "Zgłaszanie cyberoszustw",
    category: "Zagrożenia cyfrowe",
    description: "Co zrobić po otrzymaniu podejrzanej wiadomości.",
    content:
      "Podejrzane SMS-y z linkami można przesłać pod numer 8080. Próby wyłudzenia, oszustwa lub cyberincydenty warto zgłaszać przez oficjalne kanały, np. CERT lub aplikację mObywatel. Nie odpowiadaj na podejrzane wiadomości.",
    keywords: ["SMS", "8080", "CERT", "oszustwo", "zgłoszenie"],
  },
  {
    id: "pierwsza-pomoc",
    title: "Pierwsza pomoc",
    category: "Pierwsza pomoc",
    description: "Podstawowe zasady pomocy osobie poszkodowanej.",
    content:
      "Najpierw zadbaj o bezpieczeństwo własne i poszkodowanego. Sprawdź, czy osoba reaguje. Jeśli reaguje, zapytaj, co się stało. Zadzwoń pod 112 albo wskaż konkretną osobę, która ma to zrobić.",
    keywords: ["pierwsza pomoc", "112", "poszkodowany", "bezpieczeństwo", "pomoc"],
  },
  {
    id: "osoba-nieprzytomna-ale-oddycha",
    title: "Osoba nieprzytomna, ale oddycha",
    category: "Pierwsza pomoc",
    description: "Co zrobić, gdy poszkodowany nie reaguje, ale oddycha.",
    content:
      "Sprawdź oddech. Jeśli poszkodowany oddycha, ułóż go w pozycji bocznej ustalonej. Obserwuj stan do czasu przyjazdu ratowników. Poproś konkretną osobę o przyniesienie defibrylatora AED.",
    keywords: ["nieprzytomny", "oddech", "pozycja boczna", "AED", "ratownicy"],
  },
  {
    id: "osoba-nie-oddycha",
    title: "Osoba nie oddycha",
    category: "Pierwsza pomoc",
    description: "Jak rozpocząć resuscytację krążeniowo-oddechową.",
    content:
      "Połóż osobę na plecach na twardym podłożu. Udrożnij drogi oddechowe i sprawdź oddech przez 10 sekund. Jeśli nie oddycha, uciskaj środek klatki piersiowej mocno i rytmicznie. Po 30 uciśnięciach wykonaj 2 oddechy, jeśli chcesz i potrafisz. Jeśli nie, kontynuuj same uciski.",
    keywords: ["RKO", "oddech", "uciski", "resuscytacja", "pomoc"],
  },
  {
    id: "uzycie-defibrylatora-aed",
    title: "Użycie defibrylatora AED",
    category: "Pierwsza pomoc",
    description: "Jak postępować z AED.",
    content:
      "Poproś kogoś o przyniesienie AED. Włącz urządzenie i wykonuj polecenia głosowe. AED samo instruuje, kiedy przykleić elektrody i czy należy wykonać wyładowanie. Nie bój się użycia urządzenia, jest stworzone dla osób bez doświadczenia medycznego.",
    keywords: ["AED", "defibrylator", "elektrody", "RKO", "pomoc"],
  },
  {
    id: "obfity-krwotok",
    title: "Obfity krwotok",
    category: "Pierwsza pomoc",
    description: "Jak szybko reagować przy silnym krwawieniu.",
    content:
      "Załóż opatrunek uciskowy. Jeśli krwawienie z kończyny nie ustaje, użyj opaski uciskowej powyżej rany i zapisz godzinę założenia. Jeśli nie masz opatrunku, uciskaj ranę dłonią lub materiałem aż do przybycia pomocy.",
    keywords: ["krwotok", "opatrunek", "opaska", "rana", "ucisk"],
  },
  {
    id: "wychlodzenie-poszkodowanego",
    title: "Wychłodzenie poszkodowanego",
    category: "Pierwsza pomoc",
    description: "Jak chronić osobę po urazie przed utratą ciepła.",
    content:
      "Okryj poszkodowanego kocem, folią termiczną lub ubraniem. Osoby po urazie mogą wychładzać się szybciej. Monitoruj ich stan do czasu przyjazdu ratowników.",
    keywords: ["wychłodzenie", "koc", "folia", "uraz", "ratownicy"],
  },
  {
    id: "higiena-w-kryzysie",
    title: "Higiena w kryzysie",
    category: "Higiena",
    description: "Jak utrzymać higienę przy braku wody, prądu lub ogrzewania.",
    content:
      "Używaj chusteczek nawilżanych i płynów do dezynfekcji. Oszczędzaj wodę do picia i podstawowej higieny. Oddziel odpady i nieczystości od żywności oraz rzeczy osobistych.",
    keywords: ["higiena", "woda", "dezynfekcja", "odpady", "kryzys"],
  },
  {
    id: "awaryjna-toaleta",
    title: "Awaryjna toaleta",
    category: "Higiena",
    description: "Co zrobić, gdy nie działa kanalizacja lub nie ma bieżącej wody.",
    content:
      "Możesz przygotować prowizoryczną toaletę z wiadra i plastikowej torby. Po użyciu torbę wyrzuć do osobnego pojemnika. Zapachy można ograniczać ziemią, trocinami lub żwirkiem.",
    keywords: ["toaleta", "higiena", "kanalizacja", "woda", "odpady"],
  },
  {
    id: "rodzinny-plan-kryzysowy",
    title: "Rodzinny plan kryzysowy",
    category: "Plan kryzysowy",
    description: "Jak przygotować rodzinę na rozdzielenie i brak łączności.",
    content:
      "Ustal dane kontaktowe domowników, miejsca spotkań w okolicy i poza miejscowością. Zapisz numery do bliskich, sąsiadów, lekarzy, szkoły i pracy. Regularnie aktualizuj plan i ćwicz go z domownikami.",
    keywords: ["plan", "rodzina", "kontakt", "spotkanie", "łączność"],
  },
  {
    id: "miejsca-spotkan-rodziny",
    title: "Miejsca spotkań rodziny",
    category: "Plan kryzysowy",
    description: "Jak wyznaczyć punkty spotkań na wypadek rozdzielenia.",
    content:
      "Wybierz jedno miejsce blisko domu i jedno poza miejscowością. Ustal, kto będzie osobą kontaktową. Zapisz adresy i numery telefonów na papierze, nie tylko w telefonie.",
    keywords: ["spotkanie", "rodzina", "kontakt", "adres", "plan"],
  },
  {
    id: "lista-waznych-kontaktow",
    title: "Lista ważnych kontaktów",
    category: "Plan kryzysowy",
    description: "Jak przygotować kontakty na sytuację awaryjną.",
    content:
      "Zapisz numery do rodziny, sąsiadów, lekarza rodzinnego, szkoły, pracy, opiekunów dzieci, seniorów lub osób z niepełnosprawnościami. Trzymaj listę w telefonie i w wersji papierowej.",
    keywords: ["kontakty", "telefon", "rodzina", "lekarz", "plan"],
  },
  {
    id: "identyfikatory-dla-dzieci-i-seniorow",
    title: "Identyfikatory dla dzieci i seniorów",
    category: "Rodzina",
    description: "Jak ułatwić pomoc osobom, które mogą się zgubić lub mieć problemy z komunikacją.",
    content:
      "Przygotuj identyfikator z imieniem, nazwiskiem, telefonem kontaktowym i ważnymi informacjami medycznymi. Dotyczy to szczególnie dzieci, seniorów i osób z niepełnosprawnościami.",
    keywords: ["identyfikator", "dzieci", "senior", "kontakt", "medyczne"],
  },
  {
    id: "dekalog-bezpieczenstwa",
    title: "Dekalog bezpieczeństwa",
    category: "Podsumowanie",
    description: "Najważniejsze zasady przygotowania na kryzys.",
    content:
      "Korzystaj z wiarygodnych źródeł. Przygotuj rodzinny plan kryzysowy. Zgromadź zapasy na minimum 3 dni. Skompletuj apteczkę i plecak ewakuacyjny. Sprawdź schronienia. Dbaj o instalacje domowe. Słuchaj poleceń służb i współpracuj z innymi.",
    keywords: ["zasady", "plan", "zapasy", "apteczka", "schronienie"],
  },
  {
    id: "wiarygodne-zrodla-informacji",
    title: "Wiarygodne źródła informacji",
    category: "Informacje",
    description: "Jak unikać paniki i fałszywych komunikatów.",
    content:
      "Sprawdzaj komunikaty w oficjalnych źródłach. Korzystaj z rządowych stron, służb państwowych, radia i telewizji. Nie przekazuj dalej niesprawdzonych informacji. W sytuacji kryzysowej plotki mogą zwiększyć chaos.",
    keywords: ["informacje", "źródła", "komunikaty", "radio", "plotki"],
  },
  {
    id: "aplikacja-rso-i-alerty",
    title: "Aplikacja RSO i alerty",
    category: "Alarmy",
    description: "Jak otrzymywać ostrzeżenia o zagrożeniach.",
    content:
      "Warto korzystać z Regionalnego Systemu Ostrzegania i Alertów RCB. Dzięki nim można otrzymać informacje o zagrożeniach pogodowych, ewakuacji lub innych sytuacjach kryzysowych. Po otrzymaniu alertu stosuj się do zaleceń.",
    keywords: ["RSO", "RCB", "alert", "ostrzeżenia", "ewakuacja"],
  },
  {
    id: "pomoc-sasiedzka",
    title: "Pomoc sąsiedzka",
    category: "Społeczność",
    description: "Dlaczego warto znać osoby mieszkające w pobliżu.",
    content:
      "Nawiąż kontakt z sąsiadami. Ustal, kto może potrzebować pomocy, a kto może jej udzielić. Grupa sąsiedzka może szybciej przekazywać informacje, pomagać seniorom i wspólnie organizować działania w kryzysie.",
    keywords: ["sąsiedzi", "pomoc", "społeczność", "senior", "informacje"],
  },
  {
    id: "wolontariat-i-lokalne-zaangazowanie",
    title: "Wolontariat i lokalne zaangażowanie",
    category: "Społeczność",
    description: "Jak można wspierać bezpieczeństwo lokalne.",
    content:
      "Możesz zaangażować się w wolontariat, organizacje humanitarne, ochotniczą straż pożarną, klub sportowy lub lokalne inicjatywy. W kryzysie bardzo ważne są osoby, które potrafią szybko pomagać innym.",
    keywords: ["wolontariat", "społeczność", "OSP", "pomoc", "lokalnie"],
  },
  {
    id: "pomoc-humanitarna",
    title: "Pomoc humanitarna",
    category: "Społeczność",
    description: "Jak rozpoznać nadużycia przy oferowaniu pomocy.",
    content:
      "Pomoc humanitarna powinna być bezpłatna. Nikt nie powinien żądać od Ciebie pieniędzy lub przysług za udzielenie pomocy. Jeśli ktoś zachowuje się podejrzanie, zachowaj ostrożność i zgłoś sytuację odpowiednim służbom.",
    keywords: ["pomoc", "humanitarna", "nadużycia", "służby", "ostrożność"],
  },
];

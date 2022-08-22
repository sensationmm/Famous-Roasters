import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_BLOG_BY_CATEGORY_LIST = loader('src/graphql/queries/blogListByCategory.query.graphql')

export const BlogListByCategoryMock = {
  request: {
    query: GET_BLOG_BY_CATEGORY_LIST,
    variables: {
      category: 'Kaffeewissen',
    },
  },
  result: {
    data: {
      standardBlogPosts: [
        {
          __typename: 'standardBlogPost',
          title: 'Full Immersion Zubereitung mit der French Press.',
          postType: 'article',
          content: {
            __typename: 'RichText',
            text: 'Kaffee brühen in einer Pressstempelkanne.\\nIn der Studentenbude zeugt sie von zahlreichen Einsätzen. Auf dem Regal der großbürgerlichen Villa funkelt die Designerversion. Sie zieht sich durch alle Bevölkerungsgruppen, fast jeder kennt sie, viele haben eine oder mehrere zu Hause. Die ikonische Kanne gibt es in den verschiedensten Materialien. Besonders beliebt sind Modell aus Glas oder Edelstahl. Die French Press, oder auch Pressstempelkanne gehört zu den populärsten Arten der Kaffeezubereitung. Und das aus vielerlei Gründen. Einer der wichtigsten ist die Tatsache, dass sie zu den Full Immersion Kaffeebereitern zählt. Was heißt das? Bei der Extraktion ist der beliebig grob gemahlene Kaffee durchgehend mit heißem Wasser in Kontakt und wird erst danach gefiltert. Das Metallsieb, das als Filter dient, belässt die im Kaffee enthaltenen Fette und Öle. Im Vergleich zu anderen Methoden der Kaffeezubereitung verleiht dies dem Getränk einen vollmundigeren Geschmack und mehr Körper. Und das schmeckt man bei jeder Tasse. Wer also seinen Kaffee so am liebsten mag, dem sei die French Press wärmstens empfohlen. Einfach mal ausprobieren!\\nKaffee mit mittlerem Mahlgrad einfüllen, warten, pressen – und genießen. \\nWas die French Press außerdem so überzeugend macht, ist ihre unkomplizierte Handhabung. Nach nur wenigen Handgriffen steht dem puren Kaffeegenuss nichts mehr im Wege. Für die Zubereitung eures Kaffees in der French Press empfiehlt sich ein mittlerer bis grober Mahlgrad, am besten frisch gemahlen. Die Wassertemperatur sollte ca. 96 Grad betragen. Doch das nur als Anhaltspunkt, denn Ihr könnt ganz problemlos herumexperimentieren. So werden beispielsweise 60 Gramm gemahlener Kaffee für die 1-Liter-Stempelkanne empfohlen. Aber auch das ist eurem persönlichen Geschmack überlassen. Wer seinen Kaffee intensiver mag, nimmt etwas mehr Kaffee. Nun einfach die French Press mit der gewünschten Menge frisch gemahlenem Kaffee befüllen, anschließend mit heißem Wasser übergießen und mit kreisenden Bewegungen vorsichtig umrühren. Den Kaffee je nach gewünschter Stärke zwischen 3 und 5 Minuten ziehen lassen, nun noch das Sieb vorsichtig herunterdrücken. Weil es sich um eine manuelle Methode handelt, könnt Ihr mehr Kontrolle über Wassertemperatur und Extraktionszeit sowie die Menge des gemahlenen Kaffees ausüben. Dadurch habt Ihr die Möglichkeit, zu beeinflussen, wie euer Kaffee am Ende schmeckt. Einmal French Press-Fan, werdet Ihr im Laufe der Zeit eure ganz eigene Art der Zubereitung und den perfekten Kaffee dazu entdecken. \\nKaffeegenuss in seiner praktischsten Form.\\nIhr möchtet auch im Urlaub nicht auf das besondere Tässchen am Morgen verzichten? Wie gut, dass die Pressstempelkanne zu den unkompliziertesten Kaffeebereitern gehört und Ihr sie überall hin mitnehmen könnt. Und sollte sie doch einmal kaputt oder verloren gehen, kostet das auch nicht die Welt. Hauptsache, Ihr macht beim Geschmack keinerlei Abstriche!\\n',
          },
          slug: 'frenchpress',
          localizations: [],
          thumbnail: {
            __typename: 'Asset',
            url: 'https://media.graphassets.com/q6XrYJTlQVapNl047XNr',
          },
          updatedBy: {
            name: '60beans user 2',
          },
          tags: ['Text'],
        },
        {
          __typename: 'standardBlogPost',
          title: 'Die Kunst der Kaffee-Extraktion.',
          postType: 'article',
          content: {
            __typename: 'RichText',
            text: 'Exkurs in eine wenig verstandene Theorie – nicht nur für Kaffee-Nerds.\n\\nUm die fünf Monate dauert es im Schnitt, bis ein Kaffee brühfertig vor uns steht. Zahllose Momente der Leidenschaft und der Liebe flossen von der Ernte bis zur Röstung in ein hervorragendes Endprodukt. Versauen wir’s nicht! Denn in nicht einmal drei Minuten falschen Brühens können wir die Vielfalt an Aromen zunichte oder den Kaffee beispielsweise zu bitter machen. Eben deshalb ist es wichtig, dass wir unseren Kaffee richtig und schonend zubereiten. Doch was passiert eigentlich genau bei dieser sogenannten Kaffee-Extraktion? Welche verschiedenen Methoden der Extraktion gibt es? Und warum überhaupt sollten wir uns mit dieser doch eher abgehobenen Theorie befassen? Ganz einfach: Weil der Kaffee besser wird. Je mehr wir über die physikalisch-chemischen Prozesse beim Kaffeebrühen Bescheid wissen, desto mehr können wir vorhersehen, welche Aromen am Ende in der Tasse landen. Und das sollte ja nicht nur die Kaffee-Nerds unter euch interessieren.\\n\\nFiltern, oder: Wie sich die Extraktion auf den Geschmack eures Kaffees auswirkt.\\nEs ist der Moment, in dem die Magie passiert. Heißes Wasser trifft direkt auf frisch gemahlenen Kaffee. Was allein darin schon steckt, ist beachtlich: Kaffee enthält mehr als 1.000 Substanzen, von denen wir bis heute noch nicht alle chemisch entschlüsselt haben. Für die Extraktion ist interessant, welche davon wasserlöslich sind. Etwa 70 % des Kaffees bestehen aus nicht wasserlöslichen Stoffen, nur 30 % dagegen sind wasserlöslich. Bei der Extraktion löst das Wasser die löslichen Anteile aus dem festen Stoff und bringt sie in das Getränk: Aromen, Fette, Bitterstoffe, Säuren und Mineralien. Die kompletten 30 %? Nicht ganz. Als geschmacklich optimal hat es sich erwiesen wenn lediglich 18 % – 22 % extrahiert werden. Innerhalb dieser Werte gilt die Balance zwischen Bitterkeit und Säure als ausgeglichen. Als aufmerksame Kaffeetrinker werdet Ihr bemerken, dass sich die beiden Aromen zu einer gewisse Süße ergänzen. Der Kaffee schmeckt! \\nAuf der Suche nach dem perfekten Verhältnis: Methoden der Extraktion.\\nJeder Barista weiß natürlich, dass viele weitere Faktoren Einfluss auf die Extraktion nehmen. Der Mahlgrad, die Zusammensetzung des Wassers, Temperatur, Druck, die Extraktionszeit und das Verhältnis von Dosierung und \t\tWasser sind wichtige Variablen, die in ein optimales Verhältnis gebracht werden wollen. Bei jedem Brühverfahren vollzieht sich die Extraktion anders, weshalb auch die Parameter angepasst werden müssen. Bei der Dekoktion \t\tzum Beispiel hat eine größere Menge Kaffee längeren Kontakt mit Wasser. Wie es bei der Zubereitung von gekochtem oder türkischen Kaffee, im Perkolator oder einer Vakuum-Brühgruppe der Fall ist. Bei der Infusion – dem klassischen Filterkaffee – fließt heißes Wasser mit vergleichsweise kurzer Kontaktzeit durch ein Kaffeebett. Bei der Extraktion über Druck sorgt dieser dafür, dass Wasser durch ein Kaffeebett gepresst wird und so guter Geschmack in eure Tasse oder ins Glas kommt. Denn letztlich entscheidet es euer Gaumen!',
          },
          slug: 'kaffee-extraktion',
          localizations: [],
          thumbnail: {
            __typename: 'Asset',
            url: 'https://media.graphassets.com/aihzocmnSumexnThr6JE',
          },
          updatedBy: {
            name: '60beans user 1',
          },
          tags: [],
        },
        {
          __typename: 'standardBlogPost',
          title: 'In aller Munde: Spezialitätenkaffee oder Specialty Coffee.',
          postType: 'article',
          content: {
            __typename: 'RichText',
            text: 'Der Siegeszug von Spitzenqualität, Single Origin und Direct Trade.\t\\nDie etwas Älteren unter uns werden sich noch erinnern: Eine schöne Tasse Kaffee mit Oma, frisch aufgebrüht und mit Stolz in der Stimme serviert: „Die Krönung.“ Oder: „Das ist Premium.“ Es gab wenige große Marken, die sich die Hoheit über Deutschlands Kaffeetafeln aufteilten. Heute herrscht Vielfalt und wir tauschen uns mit unserem Lieblingsbarista über Spezialitätenkaffee aus. Stellen höchste Ansprüche an die Qualität der Bohne, fachsimpeln beim Schlürfen über Herkunft und Röstung, schmecken die Feinheiten heraus. Aber warum ist das eigentlich so? Warum sagen den meisten Kaffeekennern Begriffe wie Single Origin oder Direct Trade etwas? Weil eine Frau den Weg dafür bereitete: Erna Knutsen, die „Godmother of Coffee“ prägte bereits in den Siebzigern als erste den Begriff Specialty Coffee oder Spezialitätenkaffee und machte ihn zu dem, was er heute ist: eine Bewegung.  \\nHohe Standards, hochwertiger Kaffee: Am Anfang steht das Cupping.\\nDie große alte Dame des Kaffees gründete nicht nur ihren eigenen Handel mit Spezialitätenkaffee, sondern ließ sich den Begriff Specialty Coffee schützen und wirkte federführend an der Gründung der SCA, der Specialty Coffee Association mit. Es handelt sich um eine gemeinnützige Organisation, die Tausende Kaffeespezialisten in über 100 Ländern rund um den Globus vereint. Farmer sind ebenso dabei wie Maschinenhersteller. Röster gehören dazu genauso wie Baristas. Gemeinsames erklärtes Ziel ist es, Kaffee besser zu machen und höchste Qualität durch verbindliche Standards zu schützen. Dies geschieht hauptsächlich über eine Einstufung des Kaffees im Rahmen professioneller Verkostungen, den so genannten Cuppings. Speziell von der SCA dafür ausgebildete Q-Grader gehen dabei nach einem streng \tvorgegebenen Prozedere vor und vergeben Punkte in einem einheitlichen Bewertungsverfahren.\t\\nTrau keinem unter 80.\t\\nNeben der optischen und äußerlichen Begutachtung des Rohkaffees auf seine Fehlerfreiheit wird der Kaffee in seiner Sensorik auf Faktoren wie Aroma, Geschmack, Nachgeschmack, Säure, Körper, Balance und Gesamteindruck analysiert. Spezialitätenkaffee darf sich demnach nur nennen, wer von den gewissenhaften Q-Gradern eine Gesamtpunktzahl von 80 oder höher auf der bis 100 reichenden SCA-Skala erhalten hat. Ein Zeichen von Exklusivität, denn \tnur etwa 5 % des weltweit gehandelten Kaffees erreicht bei Cuppings eine derart hohe Punktzahl. Faustregel: Je höher die Bewertung auf über 80 steigt, desto erstklassiger und exklusiver ist der Kaffee. Sollte euch also bei eurem Röster des Vertrauens oder natürlich bei uns das eine oder andere Kilo eines solchen high standard Kaffees über den Weg laufen: Am besten gleich zuschlagen!\\nKaffeegenuss als Erlebnis zelebrieren.\\nFür immer mehr Kaffeeliebhaber ist das sensorische Erlebnis, das der Genuss einer exzellenten Tasse Kaffee bietet, nur das Ende einer Kette von Faktoren, die ebenfalls stimmen müssen. Es beginnt mit dem Terroir, der Herkunft der Bohne. Wie heißt die Kaffeefarm und wie eng ist der persönliche Kontakt zwischen Kaffeeröster und Produzent? Gibt es direkten Handel und wie fair werden die Mitarbeiter bezahlt? Wie schonend ist die anschließende Röstung, die alle Nuancen des Aromas unterstützt? Maschine oder gebrüht? All diese Fragen interessieren uns und tragen zu einem runden Gesamterlebnis bei. Genießen wir also die besten Kaffees, die es je gab. Sorry, Oma!',
          },
          slug: 'spezialitatenkaffee',
          localizations: [],
          thumbnail: {
            __typename: 'Asset',
            url: 'https://media.graphassets.com/l3bWMvc8RSuRTeBei0z8',
          },
          updatedBy: {
            name: '60beans user 1',
          },
          tags: [],
        },
        {
          __typename: 'standardBlogPost',
          title: 'Test Video',
          postType: 'video',
          content: {
            __typename: 'RichText',
            text: '\\n\\ntest',
          },
          slug: 'test-video',
          localizations: [],
          thumbnail: {
            __typename: 'Asset',
            url: 'https://media.graphassets.com/l3bWMvc8RSuRTeBei0z8',
          },
          updatedBy: {
            name: '60beans',
          },
          tags: ['ColdDrip', 'Aeropress', 'Siebtraeger', 'SpecialityCoffee'],
        },
      ],
      category: {
        __typename: 'Category',
        summary: 'Werde zum Kaffee-Nerd. Unsere Experten erklären alles: Von Aroma bis Zubereitungsmethode.',
        tags: ['Nachhaltigkeit', 'SpecialityCoffee'],
      },
    },
  },
}

export const BlogListByCategoryEmptyMock = {
  request: {
    query: GET_BLOG_BY_CATEGORY_LIST,
    variables: {
      category: 'Kaffeewissen',
    },
  },
  result: {
    data: {
      standardBlogPosts: [],
      category: {
        __typename: 'Category',
        summary: 'Werde zum Kaffee-Nerd. Unsere Experten erklären alles: Von Aroma bis Zubereitungsmethode.',
        tags: ['Nachhaltigkeit', 'SpecialityCoffee'],
      },
    },
  },
}

export const BlogListByCategoryMockError = {
  request: {
    query: GET_BLOG_BY_CATEGORY_LIST,
    variables: {
      category: 'Kaffeewissen',
    },
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}

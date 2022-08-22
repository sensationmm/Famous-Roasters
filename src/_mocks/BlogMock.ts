import { GraphQLError } from 'graphql'
import { loader } from 'graphql.macro'

const GET_BLOG = loader('src/graphql/queries/blog.query.graphql')

export const BlogMock = {
  request: {
    query: GET_BLOG,
    variables: {
      locale: 'de_de',
      slug: 'frenchpress',
    },
  },
  result: {
    data: {
      standardBlogPosts: [
        {
          __typename: 'StandardBlogPost',
          id: 'cl5b5qvrcqe080btdihqpkpip',
          locale: 'de_de',
          title: 'Full Immersion Zubereitung mit der French Press.',
          seoTitle: 'Kaffeezubereitung mit der French Press.',
          seoMetaDescription:
            'Brühdauer, Mahlgrad und Co: Was ihr zur perfekten Kaffeezubereitung mit der French Press wissen müsst, findet ihr in unserem Blogbeitrag zur Stempelkanne.',
          content: {
            __typename: 'RichText',
            html: '<h2>Kaffee brühen in einer Pressstempelkanne.</h2><p>In der Studentenbude zeugt sie von zahlreichen Einsätzen. Auf dem Regal der großbürgerlichen Villa funkelt die Designerversion. Sie zieht sich durch alle Bevölkerungsgruppen, fast jeder kennt sie, viele haben eine oder mehrere zu Hause. Die ikonische Kanne gibt es in den verschiedensten Materialien. Besonders beliebt sind Modell aus Glas oder Edelstahl. Die French Press, oder auch Pressstempelkanne gehört zu den populärsten Arten der Kaffeezubereitung. Und das aus vielerlei Gründen. Einer der wichtigsten ist die Tatsache, dass sie zu den Full Immersion Kaffeebereitern zählt. Was heißt das? Bei der Extraktion ist der beliebig grob gemahlene Kaffee durchgehend mit heißem Wasser in Kontakt und wird erst danach gefiltert. Das Metallsieb, das als Filter dient, belässt die im Kaffee enthaltenen Fette und Öle. Im Vergleich zu anderen Methoden der Kaffeezubereitung verleiht dies dem Getränk einen vollmundigeren Geschmack und mehr Körper. Und das schmeckt man bei jeder Tasse. Wer also seinen Kaffee so am liebsten mag, dem sei die French Press wärmstens empfohlen. Einfach mal ausprobieren!</p><h2>Kaffee mit mittlerem Mahlgrad einfüllen, warten, pressen – und genießen. </h2><p>Was die French Press außerdem so überzeugend macht, ist ihre unkomplizierte Handhabung. Nach nur wenigen Handgriffen steht dem puren Kaffeegenuss nichts mehr im Wege. Für die Zubereitung eures Kaffees in der French Press empfiehlt sich ein mittlerer bis grober Mahlgrad, am besten frisch gemahlen. Die Wassertemperatur sollte ca. 96 Grad betragen. Doch das nur als Anhaltspunkt, denn Ihr könnt ganz problemlos herumexperimentieren. So werden beispielsweise 60 Gramm gemahlener Kaffee für die 1-Liter-Stempelkanne empfohlen. Aber auch das ist eurem persönlichen Geschmack überlassen. Wer seinen Kaffee intensiver mag, nimmt etwas mehr Kaffee. Nun einfach die French Press mit der gewünschten Menge frisch gemahlenem Kaffee befüllen, anschließend mit heißem Wasser übergießen und mit kreisenden Bewegungen vorsichtig umrühren. Den Kaffee je nach gewünschter Stärke zwischen 3 und 5 Minuten ziehen lassen, nun noch das Sieb vorsichtig herunterdrücken. Weil es sich um eine manuelle Methode handelt, könnt Ihr mehr Kontrolle über Wassertemperatur und Extraktionszeit sowie die Menge des gemahlenen Kaffees ausüben. Dadurch habt Ihr die Möglichkeit, zu beeinflussen, wie euer Kaffee am Ende schmeckt. Einmal French Press-Fan, werdet Ihr im Laufe der Zeit eure ganz eigene Art der Zubereitung und den perfekten Kaffee dazu entdecken. </p><h2>Kaffeegenuss in seiner praktischsten Form.</h2><p>Ihr möchtet auch im Urlaub nicht auf das besondere Tässchen am Morgen verzichten? Wie gut, dass die Pressstempelkanne zu den unkompliziertesten Kaffeebereitern gehört und Ihr sie überall hin mitnehmen könnt. Und sollte sie doch einmal kaputt oder verloren gehen, kostet das auch nicht die Welt. Hauptsache, Ihr macht beim Geschmack keinerlei Abstriche!</p><p></p>',
            text: 'Kaffee brühen in einer Pressstempelkanne.\\nIn der Studentenbude zeugt sie von zahlreichen Einsätzen. Auf dem Regal der großbürgerlichen Villa funkelt die Designerversion. Sie zieht sich durch alle Bevölkerungsgruppen, fast jeder kennt sie, viele haben eine oder mehrere zu Hause. Die ikonische Kanne gibt es in den verschiedensten Materialien. Besonders beliebt sind Modell aus Glas oder Edelstahl. Die French Press, oder auch Pressstempelkanne gehört zu den populärsten Arten der Kaffeezubereitung. Und das aus vielerlei Gründen. Einer der wichtigsten ist die Tatsache, dass sie zu den Full Immersion Kaffeebereitern zählt. Was heißt das? Bei der Extraktion ist der beliebig grob gemahlene Kaffee durchgehend mit heißem Wasser in Kontakt und wird erst danach gefiltert. Das Metallsieb, das als Filter dient, belässt die im Kaffee enthaltenen Fette und Öle. Im Vergleich zu anderen Methoden der Kaffeezubereitung verleiht dies dem Getränk einen vollmundigeren Geschmack und mehr Körper. Und das schmeckt man bei jeder Tasse. Wer also seinen Kaffee so am liebsten mag, dem sei die French Press wärmstens empfohlen. Einfach mal ausprobieren!\\nKaffee mit mittlerem Mahlgrad einfüllen, warten, pressen – und genießen. \\nWas die French Press außerdem so überzeugend macht, ist ihre unkomplizierte Handhabung. Nach nur wenigen Handgriffen steht dem puren Kaffeegenuss nichts mehr im Wege. Für die Zubereitung eures Kaffees in der French Press empfiehlt sich ein mittlerer bis grober Mahlgrad, am besten frisch gemahlen. Die Wassertemperatur sollte ca. 96 Grad betragen. Doch das nur als Anhaltspunkt, denn Ihr könnt ganz problemlos herumexperimentieren. So werden beispielsweise 60 Gramm gemahlener Kaffee für die 1-Liter-Stempelkanne empfohlen. Aber auch das ist eurem persönlichen Geschmack überlassen. Wer seinen Kaffee intensiver mag, nimmt etwas mehr Kaffee. Nun einfach die French Press mit der gewünschten Menge frisch gemahlenem Kaffee befüllen, anschließend mit heißem Wasser übergießen und mit kreisenden Bewegungen vorsichtig umrühren. Den Kaffee je nach gewünschter Stärke zwischen 3 und 5 Minuten ziehen lassen, nun noch das Sieb vorsichtig herunterdrücken. Weil es sich um eine manuelle Methode handelt, könnt Ihr mehr Kontrolle über Wassertemperatur und Extraktionszeit sowie die Menge des gemahlenen Kaffees ausüben. Dadurch habt Ihr die Möglichkeit, zu beeinflussen, wie euer Kaffee am Ende schmeckt. Einmal French Press-Fan, werdet Ihr im Laufe der Zeit eure ganz eigene Art der Zubereitung und den perfekten Kaffee dazu entdecken. \\nKaffeegenuss in seiner praktischsten Form.\\nIhr möchtet auch im Urlaub nicht auf das besondere Tässchen am Morgen verzichten? Wie gut, dass die Pressstempelkanne zu den unkompliziertesten Kaffeebereitern gehört und Ihr sie überall hin mitnehmen könnt. Und sollte sie doch einmal kaputt oder verloren gehen, kostet das auch nicht die Welt. Hauptsache, Ihr macht beim Geschmack keinerlei Abstriche!\\n',
          },
          slug: 'frenchpress',
          createdBy: {
            __typename: 'User',
            name: '60beans',
            picture:
              'https://media.graphassets.com/resize=h:600,w:600,f:crop/security=policy:eyJleHBpcnkiOjE4MTQ5MTM4MjYsInBhdGgiOiIvNDVlM2I2Y2UtM2UzZC00NDk2LWI1MWYtNTgxNzg5YzUzNjAwLyIsImNvbnRhaW5lciI6ImNvbW1vbi1maWxlc3RhY2stYWU2NTM5OSIsImNhbGwiOlsicmVhZCIsImNvbnZlcnQiXSwibWF4U2l6ZSI6MTAyNDAwMDB9,signature:cb1281076efd063dce0358a0a768eb6ff6fdcaf4d0951125b3e3defa418c2235/oKUQM1Y6Sfa6cgtGDpsU',
          },
        },
      ],
    },
  },
}

export const BlogMockError = {
  request: {
    query: GET_BLOG,
    variables: {
      locale: 'de_de',
      slug: 'frenchpress',
    },
  },
  result: {
    errors: [new GraphQLError('Error!')],
  },
}

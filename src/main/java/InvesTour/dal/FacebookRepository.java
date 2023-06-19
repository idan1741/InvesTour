package InvesTour.dal;

import InvesTour.utils.Json;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class FacebookRepository {

    private final List<String> stocks = List.of("Starbucks Corp", "Netflix Inc", "NVIDIA Corp");

    public List<String> getStocks() {
        return this.stocks;
    }

    public JsonNode getStarbucksPosts() {
        return Json.parse("[\n" +
                "  {\n" +
                "    \"pageName\": \"MarketWatch\",\n" +
                "    \"url\": \"https://www.facebook.com/marketwatch/posts/pfbid02PNUURCrhq6rfcmJwR14mQrnYFjuJPVgft2mC1bUdU8axjDE5tTSDrpmFz9PrzGrcl\",\n" +
                "    \"time\": \"2023-06-15T10:27:21.000Z\",\n" +
                "    \"timestamp\": 1686824841,\n" +
                "    \"text\": \"The union representing workers at Starbucks stepped up its accusations that the coffee chain was prohibiting Pride-themed decorations at U.S. stores, saying it had documented “dozens” of instances of employees being ordered to take down flags and other accessories.\",\n" +
                "    \"likes\": 0,\n" +
                "    \"comments\": 0,\n" +
                "    \"shares\": 0\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"MarketWatch\",\n" +
                "    \"url\": \"https://www.facebook.com/marketwatch/posts/pfbid0UAdjKrhwf69jVgwGKCKpETVMbmJcyjwzjkH1EfDKY7r8Xettwsx8LPGWC7RzumY7l\",\n" +
                "    \"time\": \"2023-06-14T03:28:06.000Z\",\n" +
                "    \"timestamp\": 1686713286,\n" +
                "    \"text\": \"Starbucks on Tuesday denied allegations from its unionized employees that it had banned or prohibited Pride-themed decorations in stores across at least 21 states, saying it “unwaveringly” supported LGBTQ+ people.\",\n" +
                "    \"likes\": 5,\n" +
                "    \"comments\": 3,\n" +
                "    \"shares\": 0\n" +
                "  }\n" +
                "]");
    }

    public JsonNode getNvidiaPosts() {
        return Json.parse("[\n" +
                "  {\n" +
                "    \"pageName\": \"MarketWatch\",\n" +
                "    \"url\": \"https://www.facebook.com/marketwatch/posts/pfbid06yoU1SRqeH968pZPG2TyLpYnrZ6hwYGHz7LJXBQWNWSnQsVBGMZZsE6rRVK6mkr7l\",\n" +
                "    \"time\": \"2023-06-14T03:29:07.000Z\",\n" +
                "    \"timestamp\": 1686713347,\n" +
                "    \"text\": \"Nvidia officially joined vaunted company Tuesday, becoming just the seventh public U.S. company to finish a trading session in $1 trillion territory.\",\n" +
                "    \"likes\": 83,\n" +
                "    \"comments\": 21,\n" +
                "    \"shares\": 5\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"MarketWatch\",\n" +
                "    \"url\": \"https://www.facebook.com/marketwatch/posts/pfbid02xoVyYopJsanm7rYVK2sqDRfspKnBM5JEXMpmDY17TS9FiGKQXa1FBajRAvYEpLzkl\",\n" +
                "    \"time\": \"2023-06-13T12:54:41.000Z\",\n" +
                "    \"timestamp\": 1686660881,\n" +
                "    \"text\": \"Cathie Wood’s ARK Investment unloaded some shares of Tesla and Nvidia. ARK sold a combined 393,000 shares of Tesla worth $92 million based on Monday’s closing levels.\",\n" +
                "    \"likes\": 220,\n" +
                "    \"comments\": 56,\n" +
                "    \"shares\": 11\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"Investing.com\",\n" +
                "    \"url\": \"https://www.facebook.com/investingcom/posts/pfbid02HMsmwXPCKC3LsCiSGnPxLBzAMXnWKXK9bwEQGFUWiB4VhWefE1dBH77VTh1Y3HUbl\",\n" +
                "    \"time\": \"2023-06-01T10:28:43.000Z\",\n" +
                "    \"timestamp\": 1685615323,\n" +
                "    \"text\": \"Nvidia Joins The Exclusive $1 Trillion Market Cap Club. Which Company Will Be Next?\",\n" +
                "    \"likes\": 283,\n" +
                "    \"comments\": 365,\n" +
                "    \"shares\": 46\n" +
                "  }\n" +
                "]");
    }

    public JsonNode getNetflixPosts() {
        return Json.parse("[\n" +
                "  {\n" +
                "    \"pageName\": \"MarketWatch\",\n" +
                "    \"url\": \"https://www.facebook.com/marketwatch/posts/pfbid0N7CJ2SL6Kuzp6ShSDLqDzDcFanf32dHDTE9qVexG7CSDBBL8NhTMU91owvJxm382l\",\n" +
                "    \"time\": \"2023-06-14T14:36:03.000Z\",\n" +
                "    \"timestamp\": 1686753363,\n" +
                "    \"text\": \"Nearly a third of Netflix viewers don’t pay for the service, an analyst noted. The password crackdown could translate to millions more member additions than previously estimated, he said.\",\n" +
                "    \"likes\": 294,\n" +
                "    \"comments\": 200,\n" +
                "    \"shares\": 15\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"MarketWatch\",\n" +
                "    \"url\": \"https://www.facebook.com/marketwatch/posts/pfbid02qt3WMoQnBiVwHwRuRFceQe79XUHHQ51zTWVXdRANraCJazKM4sjkepe2CraXqLUrl\",\n" +
                "    \"time\": \"2023-06-13T17:49:21.000Z\",\n" +
                "    \"timestamp\": 1686678561,\n" +
                "    \"text\": \"Netflix stock has outperformed the broader tech universe so far this year, but a pair of analysts sees ample room for them to extend their recent run.\\n\\nNetflix could recognize an additional $2 billion in annualized revenue if just over 60% of account sharers convert into subscribers, by one estimate.\",\n" +
                "    \"likes\": 209,\n" +
                "    \"comments\": 139,\n" +
                "    \"shares\": 9\n" +
                "  }\n" +
                "]");
    }

    public JsonNode getApplePosts() {
        return Json.parse("[\n" +
                "  {\n" +
                "    \"pageName\": \"InvestorPlace\",\n" +
                "    \"url\": \"https://www.facebook.com/investorplace/posts/pfbid0DwZ5Qst92RdVNf3HbWZhNiEkWLTf5aMdSxTkR6VKKxUEbX9m2JHdkMpDAnkPfjQul\",\n" +
                "    \"time\": \"2023-06-15T15:02:28.000Z\",\n" +
                "    \"timestamp\": 1683543748,\n" +
                "    \"text\": \"#Apple is on its way to becoming the first $3 trillion company. Who will follow it?\",\n" +
                "    \"likes\": 606,\n" +
                "    \"comments\": 24,\n" +
                "    \"shares\": 127\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"Insider Finance\",\n" +
                "    \"url\": \"https://www.facebook.com/BusinessInsider.Finance/posts/pfbid037Eewjy7U5PYzDDZo9iJBmTFK9DKV3dahNpSgPvBHVsjXaG1ZWgAnaKGD5bqV1A7El\",\n" +
                "    \"time\": \"2023-05-29T13:01:44.000Z\",\n" +
                "    \"timestamp\": 1683197744,\n" +
                "    \"text\": \"Apple, Microsoft, Google parent Alphabet, Amazon, Nvidia, and Meta now account for over a quarter of the S&P 500's total market cap.\",\n" +
                "    \"likes\": 145,\n" +
                "    \"comments\": 6,\n" +
                "    \"shares\": 15\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"InvestorPlace\",\n" +
                "    \"url\": \"https://www.facebook.com/investorplace/posts/pfbid02QByzYn1Gi5NQE9VjRUfFZoUKjcgvcdcnEEoERxb1ai2f5KbYjsUed24wnZsLCzo2l\",\n" +
                "    \"time\": \"2023-05-05T02:00:47.000Z\",\n" +
                "    \"timestamp\": 1681803227,\n" +
                "    \"text\": \"#AAPL stock inched up ahead of next week's anticipated #WWDC developer conference. \",\n" +
                "    \"likes\": 14,\n" +
                "    \"comments\": 4,\n" +
                "    \"shares\": 1\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"MarketWatch\",\n" +
                "    \"url\": \"https://www.facebook.com/marketwatch/posts/pfbid0Ep7oeiKnrp9rmtVmWDRYUDFmeAeyuNxGVMAon37Bi3Djpn9x2BZBTKTojFwky3hul\",\n" +
                "    \"time\": \"2023-06-10T09:30:47.000Z\",\n" +
                "    \"timestamp\": 1681803227,\n" +
                "    \"text\": \"Apple’s mixed-reality headset is set to challenge Meta’s. Here’s why that hasn’t bothered Mark Zuckerberg.\",\n" +
                "    \"likes\": 581,\n" +
                "    \"comments\": 48,\n" +
                "    \"shares\": 15\n" +
                "  }\n" +
                "]");
    }

    public JsonNode getTeslaPosts() {
        return Json.parse("[\n" +
                "  {\n" +
                "    \"pageName\": \"InvestorPlace\",\n" +
                "    \"url\": \"https://www.facebook.com/investorplace/posts/pfbid02wjUHHsKpkgGukn9LZo1LDDnoXkJ5rCt8P74PQ8Cs5ouSCX1eB7kMrhZJ1HpmqRvWl\",\n" +
                "    \"time\": \"2023-05-03T22:00:28.000Z\",\n" +
                "    \"timestamp\": 1683543748,\n" +
                "    \"text\": \"#Tesla has set a date for its shareholder meeting. Here's what #investors need to know ahead of the big day.\",\n" +
                "    \"likes\": 100,\n" +
                "    \"comments\": 4,\n" +
                "    \"shares\": 0\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"Yahoo Finance\",\n" +
                "    \"url\": \"https://www.facebook.com/yahoofinance/posts/pfbid02JttHY7L7yRJchY9zK82aZyT1zj9EUCwiYYe4AhCP3G8rUAWKEFMx392f2SphUjZYl\",\n" +
                "    \"time\": \"2023-04-27T19:02:44.000Z\",\n" +
                "    \"timestamp\": 1683197744,\n" +
                "    \"text\": \"Tesla has lost about $87 billion in market capitalization since the EV manufacturer released its first-quarter earnings earlier this month. Here's why.\",\n" +
                "    \"likes\": 8,\n" +
                "    \"comments\": 3,\n" +
                "    \"shares\": 3\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"The Wall Street Journal\",\n" +
                "    \"url\": \"https://www.facebook.com/WSJ/posts/pfbid02xV9yrArmwjic5VoqkiPgBxkLm23kzjcSqBdykR885WQLjLXZQCvBNGVjR6smeG8Ml\",\n" +
                "    \"time\": \"2023-05-15T14:30:47.000Z\",\n" +
                "    \"timestamp\": 1681803227,\n" +
                "    \"text\": \"For the first time, companies are figuring the gains and losses in the stock awards that make up much of CEOs’ pay. Elon Musk took a nearly $10 billion hit at Tesla.\",\n" +
                "    \"likes\": 5700,\n" +
                "    \"comments\": 237,\n" +
                "    \"shares\": 235\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"MarketWatch\",\n" +
                "    \"url\": \"https://www.facebook.com/marketwatch/posts/pfbid031M3cL2JS8riLMJoGfhn2yJsoDdAY8hmDE6iKEgJZVuNNafkS3oitTgPbVY3uWSJel\",\n" +
                "    \"time\": \"2023-05-15T23:25:47.000Z\",\n" +
                "    \"timestamp\": 1681803227,\n" +
                "    \"text\": \"This RBC analyst lifted his target price on Tesla’s stock by 44%. Here’s why.\",\n" +
                "    \"likes\": 345,\n" +
                "    \"comments\": 27,\n" +
                "    \"shares\": 18\n" +
                "  },\n" +
                "  {\n" +
                "    \"pageName\": \"MarketWatch\",\n" +
                "    \"url\": \"https://www.facebook.com/marketwatch/posts/pfbid0T3f3AgUeKGpabXizoRKuPok3vwmGTVTrebNpDq8YTMiF37FaFcGcMCVGsomf3nP2l\",\n" +
                "    \"time\": \"2023-05-16T05:47:47.000Z\",\n" +
                "    \"timestamp\": 1681803227,\n" +
                "    \"text\": \"Tesla’s stock is looking at a gain of more than 5% this week, adding to an already spectacular, nearly 60% increase from the end of April.\",\n" +
                "    \"likes\": 151,\n" +
                "    \"comments\": 11,\n" +
                "    \"shares\": 11\n" +
                "  }\n" +
                "]");
    }
}

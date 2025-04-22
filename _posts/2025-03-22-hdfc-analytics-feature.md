---
layout: single
title: HDFC Account / Credit Card Statement Analysis
draft: false
date: 2025-03-22
excerpt: "I have built a CLI tool to analyze HDFC bank account and credit card statements"
tags:
  - expense-tracking
  - scribbles
author_profile: false
---

I have built a CLI tool to analyze HDFC bank account and credit card
statements called [`hdfc-analytics`][hdfc-analytics].

### Summary

The tool goes through your account statement / credit card statement and tags
it based on the category configs that you provide.

Better documentation is in the repository and maintained more than the
content in this post below
{:.notice--info}

For example if you run the CLI code as below
```
hdfc-analytics account --statement-csv=./configs/generated_statement.csv --categories-config=./configs/categories.toml --column-config=./configs/column_mapping.toml
```

It can generates a plot of your expense tagged by category like below

![expense-chart](https://raw.githubusercontent.com/vipul-sharma20/hdfc-analytics/refs/heads/feat-total-expense/screenshots/report.png)

Category configurations are defined as follows. These configurations contain
keywords that are searched for in the transaction descriptions or summaries of
account statements. Transactions are then categorized based on the
corresponding category specified in the TOML configuration.

All the configs / examples are just samples
{:.notice--info}


```toml
[Groceries]
keywords = ["grocery", "grocer"]

[Food]
keywords = ["lunch", "dinner", "breakfast", "food", "starbucks", "mcdonalds"]

[Investments]
keywords = ["investment", "mutual fund", "stonk", "stock"]

[CreditCard]
keywords = ["credit card", "autopay"]

[Rent]
keywords = ["rent"]

[Transportation]
keywords = ["uber", "ola"]

[Clothes]
keywords = ["myntra"]

[Subscriptions]
keywords = ["subscription", "linkedin", "membership", "cloud storage"]

[Health]
keywords = ["diagnostic"]

[Travel]
keywords = ["cleartrip", "vistara", "makemytrip", "airline", "hotel"]

[Shopping]
keywords = ["amazon", "shopping"] 
```

---

#### Release Timelines

1. **November 2023**: Originally, I had created this tool to analyze only account statements and launched as [v0.1.0][v0.1.0].
2. **February 2025**: Implemented support to tag account transactions using LLMs in [v0.2.0][v0.2.0].
3. **February 2025**: Added support to analyze credit card statements in [v0.3.0][v0.3.0].

---

### Updates

I am now looking to add a feature to support analysis of both account and
credit card statements together and provide a consolidated view of expenses.
Currently, you would have to run `account` and `cc` commands separately to get
the expense plot.

I am adding support for this in a feature branch [here][feature-branch]. I'll
have to make sure that credit card expense / bill payment are considered only
once. Explanation of this problem is in the commit message [here][commit-message].

Looking to launch this feature in v0.3.0 and should look like the command below

```
hdfc-analytics total --statement-dir=./configs/statements/ --categories=./configs/categories.toml --column-config=./configs/column_mapping.toml --name="JOHN DOE" --password=JOHN1384 --statement-csv=./configs/statement.csv
```


[v0.1.0]: https://github.com/vipul-sharma20/hdfc-analytics/releases/tag/v0.1.0
[v0.2.0]: https://github.com/vipul-sharma20/hdfc-analytics/releases/tag/v0.2.0
[v0.3.0]: https://github.com/vipul-sharma20/hdfc-analytics/releases/tag/v0.3.0
[hdfc-analytics]: https://github.com/vipul-sharma20/hdfc-analytics
[feature-branch]: https://github.com/vipul-sharma20/hdfc-analytics/tree/feat-total-expense
[commit-message]: https://github.com/vipul-sharma20/hdfc-analytics/commit/c6b0d81d9cf9f88b0ff8d0e95c59e32b654cf8cc

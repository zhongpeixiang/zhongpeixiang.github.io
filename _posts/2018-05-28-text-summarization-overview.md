---
title: Text Summarization Overview
tags: [review, text summarization]
---


Automatic text summarization is the task of producing a concise and fluent summary while preserving key information content and overall meaning. 
With the explosion of Internet, people are overwhelmed by the amount of information and documents on it. Automatic text summarization have applications 
such as preview of ducuments in search engine, and headline generations/post summarizations in news websites.

## Table of Content

* TOC
{:toc}

## Introduction
In general, there are two approaches to automatic text summarization: **extraction** and **abstraction**. **Extraction** means the summary is composed by
 sentences extracted from the original documents. **Abstraction** means the summary is composed by automatic text generation. Most of the systesm nowadays are 
 focusing on the extractive methods, in part because they are based on the original documents and tend to have less grammatical issues. In recent years, 
 Sequence-to-Sequence based neural networks gained popularity in abstractive text summarization tasks. 

Automatic text summarization is challenging in the sense that computers need to understand human language to understand documents and extract important 
information. Commonsense knowledge representation and reasoning are other obstacles in text summarization.  

## Related Work
### Extractive Summarization
All summarizers have common steps: *1) Construct an intermediate representation of input document. 2) Compute a score for each sentence in the representation.
1) Select a summary comprising of a number of sentences based on scores.*

#### Intermediate Representation
There are mainly two approaches to intermediate representation: **topic representation** and **indicator representation**.

Topic representation transforms input documents into a list of topics. *frequency-driven approches*, *topic word approches*, *latent semantic analysis*, and 
*Bayesian topic models* are the most common approaches to topic representation.

Indicator representation describe every sentence as a list of features and use machine learning algorithms to compute scores.

#### Scoring Sentences
We assign a sentence score to each intermediate sentence representation. The scoring mechanisms are closely related to how the intermediate representation is
computed. For topic representations, the scores are computed to measure how well a sentence represents some of the important topics in the input document. 
For indicator representation, the scores are computed by aggregating features of the sentence.

#### Selecting Sentences
Selecting a summary is usually a greedy approach, i.e., sentences with top k scores.

### Abstractive Summarization
Many recent abstractive summarization techniques are based on Seq2Seq models. They can generate novel words and phrases which are not included in the input 
document. At the mean time, they may generate sentences with gramatical errors.

## SummaRuNNer
SummaRuNNer is a RNN based sequence model for extractive summarization published in *AAAI 2017*. It achieves comparable performances to the state-of-the-art models and have advantages in model interpretability and abstractive training sentence-level labels. 

Basiclly, SummaRuNner is a two-layer RNN based sequence classifier, where the bottom layer is word-level RNN and the top layer is sentence-level RNN. The output is 1 or
0 indicating the sentence is selected or not. The classification of a sentence is based on the following information: *document representation*, *sentence represention*, 
*salience* (interaction between sentence and document), *novelty* (comparison between current sentence and previous sentences) and *position encodings*.

## Pointer-Generator Network
Pointer-Generator network is published in *ACL 2017*. It is a Seq2Seq based model with a pointing mechanism to copy words from source to output and a coverage vector to keep 
track of what has been summarized to discourage repetitions.

Basically, Pointer-Generator network makes the copy decision based on the following information: context vector, decoder state and decoder input. This is implemented as a 
soft switch via a sigmoid function. The coverage mechanism maintains a coverage vector (the sum of all previous attention vectors) and feeds it into the attention mechanism. 
The training objective includes a coverage loss that penalizes the overlap between each attention distribution and the coverage so far.

## Conclusion
In this post I briefly review text summarization and give two variants, one for extractive and one for abstractive. This is the first post in the series of AI Task Review. More posts in other AI areas are coming. 

## References
Allahyari, Mehdi, et al. "Text summarization techniques: A brief survey." arXiv preprint arXiv:1707.02268 (2017).

See, Abigail, Peter J. Liu, and Christopher D. Manning. "Get to the point: Summarization with pointer-generator networks." arXiv preprint arXiv:1704.04368 (2017).

Nallapati, Ramesh, Feifei Zhai, and Bowen Zhou. "SummaRuNNer: A Recurrent Neural Network Based Sequence Model for Extractive Summarization of Documents." AAAI. 2017.
<template>
    <Feedback v-if="saved" />
    <span v-if="!loading">
        <div class="my-deck-header card-header-title">
            <h4 :class="windowWidth < 400 ? 'size-header' : null">
                Cards repository
            </h4>

            <div class="mid-btns">
                <div class="flex flex-wrap items-center">
                    <el-dropdown>
                        <el-button round>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="sort-chevron"
                            >
                                <path
                                    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Sort decks
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    @click="resetDecks"
                                    class="sort-list"
                                    ><span class="sort-li">All cards</span>
                                </el-dropdown-item>
                                <el-dropdown-item
                                    v-for="deck of decks"
                                    :key="deck._id"
                                    @click="deckSort(deck.card_ids)"
                                    class="sort-list"
                                    ><span class="sort-li">{{ deck.name }}</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>

                <div class="flex flex-wrap items-center dropby-sort">
                    <el-dropdown>
                        <el-button round>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="sort-chevron"
                            >
                                <path
                                    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Sort cards
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    @click="cardSort"
                                    class="crd-qst sort-list"
                                    ><span class="crd-qst sort-li">Question</span>
                                </el-dropdown-item>
                                <el-dropdown-item
                                    @click="cardSort"
                                    class="crd-awn sort-list"
                                    ><span class="crd-awn sort-li">Answer</span>
                                </el-dropdown-item>
                                <el-dropdown-item
                                    @click="cardSort"
                                    class="crd-dat sort-list"
                                    ><span class="crd-dat sort-li">Date</span>
                                </el-dropdown-item>
                                <el-dropdown-item
                                    @click="cardSort"
                                    class="crd-bry sort-list"
                                    ><span class="crd-bry sort-li">Burried</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>


            <!-- HEADER -->
            <div class="deck-btns">
                <span class="form-pop-up">
                    <el-button
                        type="primary"
                        @click="popForm('AddCard')"
                        class="add-deck-btn"
                    >
                        new card
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                                fill="currentColor"
                            />
                        </svg>
                    </el-button>

                    <AddCard
                        @clicked="renderCard"
                        @close="popForm"
                        v-if="add_card_form"
                    />
                </span>
            </div>
        </div>

        <div v-if="!cards.length && !loading" class="empty-deck">
            <h4>You don't have any cards on that deck !!!</h4>
        </div>

        <!-- CONTENT -->
        <!-- MOBILE -->
        <div class="decks-repo" v-if="windowWidth < 500">
            <div>
                <span v-for="card of cards" :key="card._id">
                    <el-card
                        class="common-layout box-card"
                        shadow="always"
                        :class="card.fail_counter >= 5 ? 'burried' : null"
                    >
                        <div class="img-card">
                            <img v-if="card.img_url" :src="card.img_url" />
                            <img
                                v-else
                                src="@/assets/undraw_images_re_0kll.svg"
                                class="default-img"
                            />
                        </div>

                        <div class="card-data">
                            <p>
                                <span class="card-data-inf">Question</span>
                                <span class="card-data-cnt">{{
                                    card.question
                                }}</span>
                            </p>
                            <p>
                                <span class="card-data-inf">Answer</span>
                                <span class="card-data-cnt">{{
                                    card.answer
                                }}</span>
                            </p>
                            <span v-if="card.fail_counter != null">
                                <p class="next-session">
                                    <span class="card-data-inf"
                                        >Next session</span
                                    >
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.next_session"
                                        >{{ card.next_session }}</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >You haven't reviewed that card
                                        yet</span
                                    >
                                </p>

                                <p>
                                    <span class="card-data-inf">Burry </span>
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.fail_counter < 8"
                                        >no</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >yes</span
                                    >
                                </p>
                                <button
                                    v-if="card.interval"
                                    @click="resetInterval(card._id, card.index)"
                                    class="reset-interval"
                                >
                                    reset interval
                                </button>
                            </span>
                            <p v-else class="no-ownership">
                                Pssst.. you don't have that card yet
                            </p>
                        </div>

                        <div class="repo-card-footer">
                            <button
                                class="add-to-deck-btn"
                                @click="boxReveal(card._id)"
                                :id="card._id"
                            >
                                add to a deck
                            </button>
                        </div>

                        <div
                            class="collapse-belong"
                            v-if="revealed == card._id"
                            @click="outsider"
                            id="addingCardToDeck"
                        >
                            <div class="collapse-belong-holder">
                                <p class="question-to-add">
                                    {{ card.question }}
                                </p>
                                <span
                                    v-for="(deck, index) of decks"
                                    :key="deck.deck_id"
                                >
                                    <label :for="deck.deck_id">{{
                                        deck.name
                                    }}</label>
                                    <input
                                        type="checkbox"
                                        :id="deck.deck_id"
                                        @click="
                                            cardToDeck(
                                                card._id,
                                                index,
                                                card.index
                                            )
                                        "
                                        :checked="
                                            deck.card_ids.find(
                                                (elem) => elem == card._id
                                            )
                                        "
                                    />
                                </span>
                                <button @click="boxReveal(card._id)">
                                    close
                                </button>
                            </div>
                        </div>
                    </el-card>
                </span>
            </div>
        </div>

        <!-- TABLETS -->
        <div class="decks-repo" v-if="windowWidth >= 500 && windowWidth < 900">
            <div>
                <span v-for="card of cards" :key="card._id">
                    <el-card
                        class="common-layout box-card"
                        shadow="always"
                        v-if="card.index % 2 == 0"
                        :class="card.fail_counter >= 5 ? 'burried' : null"
                    >
                        <div class="img-card">
                            <img v-if="card.img_url" :src="card.img_url" />
                            <img
                                v-else
                                src="@/assets/undraw_images_re_0kll.svg"
                                class="default-img"
                            />
                        </div>

                        <div class="card-data">
                            <p>
                                <span class="card-data-inf">Question</span>
                                <span class="card-data-cnt">{{
                                    card.question
                                }}</span>
                            </p>
                            <p>
                                <span class="card-data-inf">Answer</span>
                                <span class="card-data-cnt">{{
                                    card.answer
                                }}</span>
                            </p>
                            <span v-if="card.fail_counter != null">
                                <p class="next-session">
                                    <span class="card-data-inf"
                                        >Next session</span
                                    >
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.next_session"
                                        >{{ card.next_session }}</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >You haven't reviewed that card
                                        yet</span
                                    >
                                </p>

                                <p>
                                    <span class="card-data-inf">Burry </span>
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.fail_counter < 8"
                                        >no</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >yes</span
                                    >
                                </p>
                                <button
                                    v-if="card.interval"
                                    @click="resetInterval(card._id, card.index)"
                                    class="reset-interval"
                                >
                                    reset interval
                                </button>
                            </span>
                            <p v-else class="no-ownership">
                                Pssst.. you don't have that card yet
                            </p>
                        </div>

                        <div class="repo-card-footer">
                            <button
                                class="add-to-deck-btn"
                                @click="boxReveal(card._id)"
                                :id="card._id"
                            >
                                add to a deck
                            </button>
                        </div>

                        <div
                            class="collapse-belong"
                            v-if="revealed == card._id"
                            @click="outsider"
                            id="addingCardToDeck"
                        >
                            <div class="collapse-belong-holder">
                                <p class="question-to-add">
                                    {{ card.question }}
                                </p>
                                <span
                                    v-for="(deck, index) of decks"
                                    :key="deck.deck_id"
                                >
                                    <label :for="deck.deck_id">{{
                                        deck.name
                                    }}</label>
                                    <input
                                        type="checkbox"
                                        :id="deck.deck_id"
                                        @click="
                                            cardToDeck(
                                                card._id,
                                                index,
                                                card.index
                                            )
                                        "
                                        :checked="
                                            deck.card_ids.find(
                                                (elem) => elem == card._id
                                            )
                                        "
                                    />
                                </span>
                                <button @click="boxReveal(card._id)">
                                    close
                                </button>
                            </div>
                        </div>
                    </el-card>
                </span>
            </div>
            <div>
                <span v-for="card of cards" :key="card._id">
                    <el-card
                        class="common-layout box-card"
                        shadow="always"
                        v-if="card.index % 2 == 1"
                        :class="card.fail_counter >= 5 ? 'burried' : null"
                    >
                        <div class="img-card">
                            <img v-if="card.img_url" :src="card.img_url" />
                            <img
                                v-else
                                src="@/assets/undraw_images_re_0kll.svg"
                                class="default-img"
                            />
                        </div>

                        <div class="card-data">
                            <p>
                                <span class="card-data-inf">Question</span>
                                <span class="card-data-cnt">{{
                                    card.question
                                }}</span>
                            </p>
                            <p>
                                <span class="card-data-inf">Answer</span>
                                <span class="card-data-cnt">{{
                                    card.answer
                                }}</span>
                            </p>
                            <span v-if="card.fail_counter != null">
                                <p class="next-session">
                                    <span class="card-data-inf"
                                        >Next session</span
                                    >
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.next_session"
                                        >{{ card.next_session }}</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >You haven't reviewed that card
                                        yet</span
                                    >
                                </p>

                                <p>
                                    <span class="card-data-inf">Burry </span>
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.fail_counter < 8"
                                        >no</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >yes</span
                                    >
                                </p>
                                <button
                                    v-if="card.interval"
                                    @click="resetInterval(card._id, card.index)"
                                    class="reset-interval"
                                >
                                    reset interval
                                </button>
                            </span>
                            <p v-else class="no-ownership">
                                Pssst.. you don't have that card yet
                            </p>
                        </div>

                        <div class="repo-card-footer">
                            <button
                                class="add-to-deck-btn"
                                @click="boxReveal(card._id)"
                                :id="card._id"
                            >
                                add to a deck
                            </button>
                        </div>

                        <div
                            class="collapse-belong"
                            v-if="revealed == card._id"
                            @click="outsider"
                            id="addingCardToDeck"
                        >
                            <div class="collapse-belong-holder">
                                <p class="question-to-add">
                                    {{ card.question }}
                                </p>
                                <span
                                    v-for="(deck, index) of decks"
                                    :key="deck.deck_id"
                                >
                                    <label :for="deck.deck_id">{{
                                        deck.name
                                    }}</label>
                                    <input
                                        type="checkbox"
                                        :id="deck.deck_id"
                                        @click="
                                            cardToDeck(
                                                card._id,
                                                index,
                                                card.index
                                            )
                                        "
                                        :checked="
                                            deck.card_ids.find(
                                                (elem) => elem == card._id
                                            )
                                        "
                                    />
                                </span>
                                <button @click="boxReveal(card._id)">
                                    close
                                </button>
                            </div>
                        </div>
                    </el-card>
                </span>
            </div>
        </div>

        <!-- COMPUTER -->
        <div class="decks-repo" v-if="windowWidth >= 900">
            <div>
                <span v-for="card of cards" :key="card._id">
                    <el-card
                        class="common-layout box-card"
                        shadow="always"
                        v-if="card.index % 3 == 0"
                        :class="card.fail_counter >= 5 ? 'burried' : null"
                    >
                        <div class="img-card">
                            <img v-if="card.img_url" :src="card.img_url" />
                            <img
                                v-else
                                src="@/assets/undraw_images_re_0kll.svg"
                                class="default-img"
                            />
                        </div>

                        <div class="card-data">
                            <p>
                                <span class="card-data-inf">Question</span>
                                <span class="card-data-cnt">{{
                                    card.question
                                }}</span>
                            </p>
                            <p>
                                <span class="card-data-inf">Answer</span>
                                <span class="card-data-cnt">{{
                                    card.answer
                                }}</span>
                            </p>
                            <span v-if="card.fail_counter != null">
                                <p class="next-session">
                                    <span class="card-data-inf"
                                        >Next session</span
                                    >
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.next_session"
                                        >{{ card.next_session }}</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >You haven't reviewed that card
                                        yet</span
                                    >
                                </p>

                                <p>
                                    <span class="card-data-inf">Burry </span>
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.fail_counter < 8"
                                        >no</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >yes</span
                                    >
                                </p>
                                <button
                                    v-if="card.interval"
                                    @click="resetInterval(card._id, card.index)"
                                    class="reset-interval"
                                >
                                    reset interval
                                </button>
                            </span>
                            <p v-else class="no-ownership">
                                Pssst.. you don't have that card yet
                            </p>
                        </div>

                        <div class="repo-card-footer">
                            <button
                                class="add-to-deck-btn"
                                @click="boxReveal(card._id)"
                                :id="card._id"
                            >
                                add to a deck
                            </button>
                        </div>

                        <div
                            class="collapse-belong"
                            v-if="revealed == card._id"
                            @click="outsider"
                            id="addingCardToDeck"
                        >
                            <div class="collapse-belong-holder">
                                <p class="question-to-add">
                                    {{ card.question }}
                                </p>
                                <span
                                    v-for="(deck, index) of decks"
                                    :key="deck.deck_id"
                                >
                                    <label :for="deck.deck_id">{{
                                        deck.name
                                    }}</label>
                                    <input
                                        type="checkbox"
                                        :id="deck.deck_id"
                                        @click="
                                            cardToDeck(
                                                card._id,
                                                index,
                                                card.index
                                            )
                                        "
                                        :checked="
                                            deck.card_ids.find(
                                                (elem) => elem == card._id
                                            )
                                        "
                                    />
                                </span>
                                <button @click="boxReveal(card._id)">
                                    close
                                </button>
                            </div>
                        </div>
                    </el-card>
                </span>
            </div>

            <div>
                <span v-for="card of cards" :key="card._id">
                    <el-card
                        class="common-layout box-card"
                        shadow="always"
                        v-if="card.index % 3 == 1"
                        :class="card.fail_counter >= 5 ? 'burried' : null"
                    >
                        <div class="img-card">
                            <img v-if="card.img_url" :src="card.img_url" />
                            <img
                                v-else
                                src="@/assets/undraw_images_re_0kll.svg"
                                class="default-img"
                            />
                        </div>

                        <div class="card-data">
                            <p>
                                <span class="card-data-inf">Question</span>
                                <span class="card-data-cnt">{{
                                    card.question
                                }}</span>
                            </p>
                            <p>
                                <span class="card-data-inf">Answer</span>
                                <span class="card-data-cnt">{{
                                    card.answer
                                }}</span>
                            </p>
                            <span v-if="card.fail_counter != null">
                                <p class="next-session">
                                    <span class="card-data-inf"
                                        >Next session</span
                                    >
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.next_session"
                                        >{{ card.next_session }}</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >You haven't reviewed that card
                                        yet</span
                                    >
                                </p>

                                <p>
                                    <span class="card-data-inf">Burry </span>
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.fail_counter < 8"
                                        >no</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >yes</span
                                    >
                                </p>
                                <button
                                    v-if="card.interval"
                                    @click="resetInterval(card._id, card.index)"
                                    class="reset-interval"
                                >
                                    reset interval
                                </button>
                            </span>
                            <p v-else class="no-ownership">
                                Pssst.. you don't have that card yet
                            </p>
                        </div>

                        <div class="repo-card-footer">
                            <button
                                class="add-to-deck-btn"
                                @click="boxReveal(card._id)"
                                :id="card._id"
                            >
                                add to a deck
                            </button>
                        </div>

                        <div
                            class="collapse-belong"
                            v-if="revealed == card._id"
                            @click="outsider"
                            id="addingCardToDeck"
                        >
                            <div class="collapse-belong-holder">
                                <p class="question-to-add">
                                    {{ card.question }}
                                </p>
                                <span
                                    v-for="(deck, index) of decks"
                                    :key="deck.deck_id"
                                >
                                    <label :for="deck.deck_id">{{
                                        deck.name
                                    }}</label>
                                    <input
                                        type="checkbox"
                                        :id="deck.deck_id"
                                        @click="
                                            cardToDeck(
                                                card._id,
                                                index,
                                                card.index
                                            )
                                        "
                                        :checked="
                                            deck.card_ids.find(
                                                (elem) => elem == card._id
                                            )
                                        "
                                    />
                                </span>
                                <button @click="boxReveal(card._id)">
                                    close
                                </button>
                            </div>
                        </div>
                    </el-card>
                </span>
            </div>

            <div>
                <span v-for="card of cards" :key="card._id">
                    <el-card
                        class="common-layout box-card"
                        shadow="always"
                        v-if="card.index % 3 == 2"
                        :class="card.fail_counter >= 5 ? 'burried' : null"
                    >
                        <div class="img-card">
                            <img v-if="card.img_url" :src="card.img_url" />
                            <img
                                v-else
                                src="@/assets/undraw_images_re_0kll.svg"
                                class="default-img"
                            />
                        </div>

                        <div class="card-data">
                            <p>
                                <span class="card-data-inf">Question</span>
                                <span class="card-data-cnt">{{
                                    card.question
                                }}</span>
                            </p>
                            <p>
                                <span class="card-data-inf">Answer</span>
                                <span class="card-data-cnt">{{
                                    card.answer
                                }}</span>
                            </p>
                            <span v-if="card.fail_counter != null">
                                <p class="next-session">
                                    <span class="card-data-inf"
                                        >Next session</span
                                    >
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.next_session"
                                        >{{ card.next_session }}</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >You haven't reviewed that card
                                        yet</span
                                    >
                                </p>

                                <p>
                                    <span class="card-data-inf">Burry </span>
                                    <span
                                        class="card-data-cnt"
                                        v-if="card.fail_counter < 8"
                                        >no</span
                                    >
                                    <span class="card-data-cnt" v-else
                                        >yes</span
                                    >
                                </p>
                                <button
                                    v-if="card.interval"
                                    @click="resetInterval(card._id, card.index)"
                                    class="reset-interval"
                                >
                                    reset interval
                                </button>
                            </span>
                            <p v-else class="no-ownership">
                                Pssst.. you don't have that card yet
                            </p>
                        </div>

                        <div class="repo-card-footer">
                            <button
                                class="add-to-deck-btn"
                                @click="boxReveal(card._id)"
                                :id="card._id"
                                title="Add the card to a deck (or remove it)"
                            >
                                add to a deck
                            </button>
                        </div>

                        <div
                            class="collapse-belong"
                            v-if="revealed == card._id"
                            @click="outsider"
                            id="addingCardToDeck"
                        >
                            <div class="collapse-belong-holder">
                                <p class="question-to-add">
                                    {{ card.question }}
                                </p>
                                <span
                                    v-for="(deck, index) of decks"
                                    :key="deck.deck_id"
                                >
                                    <label :for="deck.deck_id">{{
                                        deck.name
                                    }}</label>
                                    <input
                                        type="checkbox"
                                        :id="deck.deck_id"
                                        @click="
                                            cardToDeck(
                                                card._id,
                                                index,
                                                card.index
                                            )
                                        "
                                        :checked="
                                            deck.card_ids.find(
                                                (elem) => elem == card._id
                                            )
                                        "
                                    />
                                </span>
                                <button @click="boxReveal(card._id)">
                                    close
                                </button>
                            </div>
                        </div>
                    </el-card>
                </span>
            </div>
        </div>
    </span>
</template>

<script>
import { URI, axios } from "@/plugins/index.js";
import AddCard from "@/components/AddCard.vue";
import Feedback from "@/components/Feedback.vue";

export default {
    name: "Cards",
    props: ["deckId", "query"],
    components: {
        AddCard,
        Feedback,
    },

    data() {
        return {
            cards_initial: [],
            cards: [],
            decks: [],
            id: localStorage.getItem("_id"),
            deck_id: this.$store.getters.deckCardsId,
            deck_cards: this.$store.getters.getCards,
            saved: false,
            loading: true,
            add_card_form: false,
            revealed: false,
            windowWidth: 0,
            sorting_deck_cards: false,
        };
    },

    mounted() {
        this.getCards();
        this.infiniteScroll();
    },
    created() {
        window.addEventListener("resize", this.myEventHandler);
        window.addEventListener("scroll", this.infiniteScroll);
    },
    beforeUpdate() {
        if (this.$props.query.length != 0) this.cards = this.$props.query;
        this.windowWidth = window.innerWidth;
        
        if(this.deck_cards) {
            this.decks.find(elem => {
                if(elem.deck_id == this.deck_cards){
                    this.deckSort(elem.card_ids);
                }
            }) 
            this.$store.dispatch('cards', null);
        }
    },
    unmounted() {
        window.removeEventListener("resize", this.myEventHandler);
        window.removeEventListener("scroll", this.infiniteScroll);
    },

    methods: {
        async resetInterval(_id, _index) {
            const json = JSON.stringify({ card_id: _id });

            await axios
                .put(
                    `${URI}/cards/reset/${localStorage.getItem("_id")}`,
                    json,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    if (res.status === 200) {
                        this.cards[_index].next_session = "Today";
                        this.cards[_index].fail_counter = 0;
                        this.feedback();
                    }
                })
                .catch((error) => {
                    error;
                });
        },

        resetDecks() {
            this.sorting_deck_cards = false;
            this.getCards();
        },

        deckSort(e) {
            console.log('bite')
            this.loading = !this.loading;

            this.sorting_deck_cards = true;

            this.cards_initial = [...this.cards, ...this.cards_initial];

            // let deck_cards = [];
            let deck_cards = [];
            this.cards_initial.forEach((elem) => {
                e.find((item) => {
                    if (item == elem._id) {
                        deck_cards.push(elem);
                    }
                });
            });

            deck_cards.forEach((item) => {
                this.cards_initial.find((c) => {
                    if (c === item) {
                        this.cards_initial.splice(
                            this.cards_initial.indexOf(c),
                            1
                        );
                    }
                });
            });

            this.cards = deck_cards;

            this.cards.forEach((elem, i) => (elem.index = i));
            this.loading = !this.loading;
        },

        cardSort(e) {
            this.loading = !this.loading;

            if (e.target.className.substr(0, 7) == "crd-qst")
                this.cards = this.cards.sort((a, b) => a.question > b.question);
            if (e.target.className.substr(0, 7) == "crd-awn")
                this.cards = this.cards.sort((a, b) => a.answer > b.answer);

            if (e.target.className.substr(0, 7) == "crd-bry") {
                let burried = this.cards.filter(
                    (elem) =>
                        elem.fail_counter != undefined && elem.fail_counter >= 5
                );

                burried.forEach((item) => {
                    this.cards.find((c) => {
                        if (c == item)
                            this.cards.splice(this.cards.indexOf(c), 1);
                    });
                });

                burried.forEach((elem) => this.cards.unshift(elem));
            }

            if (e.target.className.substr(0, 7) == "crd-dat") {
                let cards_session = this.cards.filter(
                    (elem) => elem.next_session
                );

                cards_session.forEach((item) => {
                    this.cards.find((c) => {
                        if (c == item)
                            this.cards.splice(this.cards.indexOf(c), 1);
                    });
                });

                cards_session.sort(function (a, b) {
                    let aa = a.next_session.split("/").reverse().join(),
                        bb = b.next_session.split("/").reverse().join();
                    return aa > bb ? -1 : aa < bb ? 1 : 0;
                });

                cards_session.forEach((elem) => this.cards.unshift(elem));
            }

            this.cards.forEach((elem, i) => (elem.index = i));
            this.loading = !this.loading;
        },

        myEventHandler() {
            this.windowWidth = window.innerWidth;
        },

        infiniteScroll() {
            window.onscroll = () => {
                if (this.sorting_deck_cards != true) {
                    let bottomOfWindow =
                        Math.max(
                            window.pageYOffset,
                            document.documentElement.scrollTop,
                            document.body.scrollTop
                        ) +
                            window.innerHeight >=
                        document.documentElement.offsetHeight - 300;

                    if (bottomOfWindow) {
                        let cut = JSON.parse(
                            JSON.stringify(this.cards_initial.splice(0, 15))
                        );
                        cut.forEach((elem) => this.cards.push(elem));
                    }
                }
            };
        },

        popForm(event) {
            if (event == "AddCard") this.add_card_form = true;
            else if (this.add_card_form)
                this.add_card_form = !this.add_card_form;
        },

        outsider() {
            if (event.target.id == "addingCardToDeck") this.revealed = false;
        },

        boxReveal(_id) {
            if (!this.revealed) {
                this.revealed = _id;
            } else if (this.revealed != _id) {
                this.revealed = _id;
            } else {
                this.revealed = false;
            }
        },

        async cardToDeck(_id, _index, _card_index) {
            const json = JSON.stringify({
                deck_id: event.target.id,
                card_id: _id,
            });

            if (event.target.checked) {
                this.decks[_index].card_ids.push(_id);
            } else {
                this.decks[_index].card_ids.find((elem) => {
                    if (elem == _id)
                        this.decks[_index].card_ids.splice(
                            this.decks[_index].card_ids.indexOf(elem),
                            1
                        );
                });
            }

            let url_one = `${URI}/cards/add-to-deck/${this.id}`;
            let url_two = `${URI}/cards/deck/${this.id}`;

            await axios
                .put(event.target.checked ? url_one : url_two, json, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        // this.feedback();
                        console.log(this.cards[_card_index].fail_counter);
                        if (this.cards[_card_index].fail_counter == undefined) {
                            this.cards[_card_index].fail_counter = 0;
                            this.cards[_card_index].next_session = null;
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async getCards() {
            if (!localStorage.getItem("token")) {
                this.$router.push({ path: `/` });
            } else {
                const promise1 = await axios.get(`${URI}/cards/${this.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });

                const promise2 = await axios.get(
                    `${URI}/decks/table/${this.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                Promise.all([promise1, promise2])
                    .then(async (res) => {
                        this.decks = await res[1].data;

                        this.cards_initial = await res[0].data.cards;
                        this.cards_initial.forEach((elem, i) => {
                            elem.index = i;
                            if (elem.next_session) {
                                if (elem.next_session.length > 10) {
                                    elem.next_session = "Today";
                                } else {
                                    elem.next_session = elem.next_session
                                        .split("-")
                                        .reverse()
                                        .join("/");
                                }
                            }
                        });
                        this.cards = this.cards_initial.splice(0, 15);

                        this.loading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },

        renderCard(event) {
            let card = {
                _id: event._id,
                question: event.question,
                answer: event.answer,
                img_url: event.img_url,
            };
            this.cards.unshift(card);
            this.cards.forEach((elem, i) => (elem.index = i));
            this.add_card_form = !this.add_card_form;
            this.feedback();
        },

        //  REQUEST FEEDBACK
        feedback() {
            this.saved = true;
            let counter = 1;
            const timer = setInterval(() => {
                counter--;
                if (counter === 0) {
                    clearInterval(timer);
                    this.saved = false;
                }
            }, 1000);
        },
    },
};
</script>

<style scoped lang="scss">
.add-deck-btn {
    background-color: #0079c2;
    border-color: #0079c2;

    svg {
        margin-left: 5px;
        width: 16px;
    }

    &:hover {
        opacity: 0.6;
    }
}

.mid-btns{
    display: flex;
    gap: 10px;
    margin-left: auto;
    margin-right: 7px;
}
.collapse-belong {
    position: fixed;
    background-color: #2223;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &-holder {
        background-color: white;
        display: flex;
        flex-direction: column;
        width: fit-content;
        padding-top: 18px !important;

        span {
            padding: 0 20px 10px 20px;
        }
        button {
            width: 100%;
            border-width: 0px;
            height: 40px;
            text-align: left;
            padding: 0.5rem 0 1.7rem 0.5rem;
            cursor: pointer;
            background-color: #333;
            color: #fff;
            border-width: 0px;
            margin-top: 15px;

            &:hover {
                opacity: 0.7;
            }
        }
    }

    label {
        width: 22ch;
        display: inline-block;
    }
}
.burried {
    background-color: #e59c2433;
}
.img-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
}
.default-img {
    opacity: 0.5;
    padding: 10px !important;
}
.question-to-add {
    padding: 0 0 20px 20px;
    font-size: 18px;
    color: #8a8d90;
}
.card-data {
    padding: 10px;

    &-inf {
        font-size: 14px;
        width: 14ch;
        display: inline-block;
        color: #8a8d90;
        padding-bottom: 3px;
    }
    &-cnt {
        font-size: 14px;
    }
    .next-session {
        display: flex;

        & :nth-child(1) {
            flex-grow: 0;
            flex-shrink: 0;
        }
    }
}
.add-to-deck-btn {
    background-color: #e59c24dd;
}
.no-ownership {
    font-size: 14px;
    color: #8a8d9066;
    padding: 3px 0 3px 0;
}
.reset-interval {
    background-color: transparent;
    border-width: 0;
    padding: 10px 0;
    color: #0079c2;
    cursor: pointer;

    &:hover {
        color: #0079c2cc;
        text-decoration: underline;
    }
}
.empty-deck {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #222;
}
@media (max-width: 500px) {
    .card-header-title{
        display: block;
        h4, .mid-btns{
            padding-bottom: 10px;
        }
    }
}

</style>

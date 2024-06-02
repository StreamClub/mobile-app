import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../assets'
import { BodyText } from '../../components/BasicComponents/BodyText'
import { SearchList } from '../../components/Search/SearchList'
import { SearchContentBar } from '../../components/Search/SearchBar'
import { ContentList } from '../../components/Content/ContentList'
import { ContentEntry } from '../../entities/ContentEntry'
import { SearchCategories } from '../../components/Search/SearchCategories'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { ArtistEntry } from '../../entities/ArtistListEntry'
import { UserEntry } from '../../entities/UsersListEntry'

export default function Search() {
    const { textSearched, results } = useAppSelector(
        (state) => state.searchContent
    )
    // ------------------------------------------------------------
    // Render functions
    // ------------------------------------------------------------

    const renderSearchHistoryTitle = () => {
        return (
            <BodyText
                style={{
                    marginTop: 20,
                    fontWeight: 'bold',
                    alignSelf: 'flex-start',
                    marginLeft: '5%',
                }}
                size="big"
                color={colors.primaryBlack}
                body={'Búsquedas recientes' + textSearched}
            />
        )
    }

    const renderContentList = (contentList: ContentEntry[] | ArtistEntry[] | UserEntry[]) => {
        return (
            <SearchList length={contentList.length}>
                <ContentList contentEntry={contentList} />
            </SearchList>
        )
    }
    // ------------------------------------------------------------

    return (
        <View style={styles.container}>
            <SearchContentBar />
            <SearchCategories />

            {textSearched.length == 0
                ? renderSearchHistoryTitle()
                : renderContentList(results)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.secondaryWhite,
    },
})

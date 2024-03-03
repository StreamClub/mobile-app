import React, { ReactNode } from 'react'
import { colors } from '../../assets'
import { BodyText } from '../BasicComponents/BodyText'
import { useAppSelector } from '../../hooks/redux/useAppSelector'

type SearchListProps = {
    length: number
    children?: ReactNode
}

export const SearchList = (params: SearchListProps) => {
    const { textSearched, loading } = useAppSelector(
        (state) => state.searchContent
    )
    const { length, children } = params

    return (
        <>
            {loading ? null : length === 0 ? (
                <BodyText
                    style={{
                        marginTop: 20,
                        fontWeight: 'bold',
                        alignSelf: 'flex-start',
                        marginLeft: '5%',
                    }}
                    size="big"
                    color={colors.primaryBlack}
                    body={'No se encontraron resultados para: ' + textSearched}
                />
            ) : (
                children // Renderiza los children directamente
            )}
        </>
    )
}

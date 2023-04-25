INSERT INTO [dbo].[Conteudo] (
    [Nome],
    [Realizador],
    [Rating],
    [DataReleased]
)
VALUES (
    @Nome,
    @Realizador,
    @Rating,
    @DataReleased
)

SELECT SCOPE_IDENTITY() AS Id
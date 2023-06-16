using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Camino.Data.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyLike<T>(this IQueryable<T> dataQueryable, string? searchValue, params Expression<Func<T, string?>>[] columnExpressions)
        {
            if (string.IsNullOrEmpty(searchValue) || columnExpressions == null || columnExpressions.Length == 0)
                return dataQueryable;
            var entityParam = Expression.Parameter(typeof(T), "entity");
            Expression[] valueExpressions = new Expression[columnExpressions.Length];

            for (int i = 0; i < columnExpressions.Length; i++)
            {
                valueExpressions[i] = columnExpressions[i].Body.ReplaceParameter(columnExpressions[i].Parameters[0], entityParam);
            }
            Expression<Func<T, bool>> lastCondition = x => false;
            foreach (Expression valueExpression in valueExpressions)
            {
                Expression<Func<string, bool>> likeExpression = d => EF.Functions.Like(d, $"%{searchValue}%");
                var likeValueExpression = likeExpression.Body.ReplaceParameter(likeExpression.Parameters[0], valueExpression);
                var condition = Expression.Lambda<Func<T, bool>>(likeValueExpression, entityParam);
                lastCondition = Or(lastCondition, condition);
            }
            return dataQueryable.Where(lastCondition);
        }

        private static Expression<Func<T, Boolean>> Or<T>(
            Expression<Func<T, Boolean>> expressionOne,
            Expression<Func<T, Boolean>> expressionTwo
        )
        {
            var invokedSecond = Expression.Invoke(expressionTwo, expressionOne.Parameters.Cast<Expression>());

            return Expression.Lambda<Func<T, Boolean>>(
                Expression.Or(expressionOne.Body, invokedSecond), expressionOne.Parameters
            );
        }
        private static Expression<Func<T, Boolean>> And<T>(
            Expression<Func<T, Boolean>> expressionOne,
            Expression<Func<T, Boolean>> expressionTwo
        )
        {
            var invokedSecond = Expression.Invoke(expressionTwo, expressionOne.Parameters.Cast<Expression>());
            return Expression.Lambda<Func<T, Boolean>>(
                Expression.And(expressionOne.Body, invokedSecond), expressionOne.Parameters
            );
        }
    }
}
